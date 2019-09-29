const Client = require('../../models/client');
const AccountVerification = require('../../models/accountVerification');
const Course = require('../../models/course.js');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const mailjet = require ('node-mailjet').connect('e0c6a34ef403821fad1711c0d3d7eeb3', '62c7acbc6606afb106b18b0ba028d8a4');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const passwordValidator = require('password-validator');

const stripe = require('stripe')('sk_test_6py6IxnU8f1xHC0yiPyR18rK00cNdvhEL1');






const passwordSchema = new passwordValidator();
passwordSchema.min(8)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().symbols();

module.exports = {

    stripePay: async function({amount}, req) {
        const charge = await stripe.charges.create({
            amount: amount * 100,
            currency: 'eur',
            source: 'tok_visa',
            receipt_email: 'zgon37@gmail.com',
        });

    },



    sendVerification: async function ({email}, req) {

        let token;
        crypto.randomBytes(20, function(ex, buffer) {
            token = buffer.toString('hex');});

        const accountVerification = await AccountVerification.findOne({email: email});

        if(!accountVerification)
            throw new Error('Error !');



        accountVerification.token = token;
        accountVerification.tokenExpiration=  Date.now() + 3600000;

        await accountVerification.save();



        const request = await mailjet
            .post("send", {'version': 'v3.1'})
            .request({
                "Messages":[
                    {
                        "From": {
                            "Email": "maxforce7@gmail.com",
                        },
                        "To": [
                            {
                                "Email": email,
                            }
                        ],
                        "Subject": "BeNeutron Sign up verification",
                        "HTMLPart": `<h1>Email Verification </h1>
                                       <p>Please click the link below to activate your account !</p>
                                       <a href="http://localhost:8080/activate/${token}">Activate Now !</a>
                                                           `,

                    }
                ]
            });

        return "Email verification Sent !!";

    },

    createClient: async function({ userInput }, req) {

        if (!validator.isEmail(userInput.email)) {
            throw new Error("E-Mail is invalid.");
        }

        if (!passwordSchema.validate(userInput.password)) {
            throw new Error("Password min length: 8, should include upper and lower cases, numbers, and symbols!");
        }

        const existingClient = await Client.findOne({ email: userInput.email });
        if (existingClient) {
            let errors = new Error('Client exists already!');
            throw errors;
        }

        const client = new Client({
            firstName: userInput.firstName,
            familyName: userInput.familyName,
            email: userInput.email,
            password:  await bcrypt.hash(userInput.password, 12),
            birthday : new Date(userInput.birthday),
            country: userInput.country,
            city: userInput.city,
            phone: userInput.phone
        });
        let token;
        crypto.randomBytes(20, function(ex, buffer) {
            token = buffer.toString('hex');});

        const createdClient = await client.save();


        //      TOKEN FOR EMAIL VERIFICATION







        const accountVerification = new AccountVerification({
            email: userInput.email,
            token: token,
            tokenExpiration: Date.now() + 3600000
        });

        await accountVerification.save();
        const request = await mailjet
            .post("send", {'version': 'v3.1'})
            .request({
                "Messages":[
                    {
                        "From": {
                            "Email": "maxforce7@gmail.com",
                        },
                        "To": [
                            {
                                "Email": userInput.email,
                            }
                        ],
                        "Subject": "BeNeutron Sign up verification",
                        "HTMLPart": `<h1>SIGN UP DONE </h1>
                                       <p>Please click the link below to activate your account !</p>
                                       <a href="http://localhost:8080/activate/${token}">Activate Now !</a>
                                                           `,

                    }
                ]
            });
        return { ...createdClient._doc, _id: createdClient._id.toString() };
    },

    activateAccount: async function({token}, req) {
        const accountVerification = await AccountVerification.findOne({token: token});
        if (!accountVerification)
            throw new Error('Error');

        if(accountVerification.tokenExpiration < Date.now())
            throw new Error('Expired Link !');

        await accountVerification.remove();

        return "Account Verified !";

    },

    updateClient: async function({ id, userInput }, req) {
        if (!req.isAuth) {
            const error = new Error('Not authenticated!');
            error.code = 401;
            throw error;
        }
        let client = await Client.findById(id);
        if (!client)
            throw new Error('Client Not Found !!');
        else {
            client.firstName = userInput.firstName;
            client.familyName = userInput.familyName;
            client.email = userInput.email;
            client.password = userInput.password;
            client.birthday = new Date(userInput.birthday);
            client.country = userInput.country;
            client.city = userInput.city;
            client.phone = userInput.phone;
            await client.save();
            return client;

        }

    },

    getClient: async function({ id }, req) {
         return await Client.findById(id).populate('courses.enrolled._id');

    },

    getClientCourses:  function({id}, req) {
        const client = this.getClient(id, req);
        /*const courses = [];
        client.courses.map(c => {
            let course = Course.findById(c.courseId);
            courses.push(course);
        });*/
        return client.courses[0].orderDate;


    },

    login: async function({ email, password }) {
        const client = await Client.findOne({ email: email });
        if (!client) {
            const error = new Error('Client not found.');
            error.code = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, client.password);
        if (!isEqual) {
            const error = new Error('Password is incorrect.');
            error.code = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                userId: client._id.toString(),
                email: client.email
            },
            'secretAuthToken',
            { expiresIn: '1h' }
        );
        return { token: token, userId: client._id.toString() };
    },

    clientForgotPassword: async function({email}, req) {

        let token;

            crypto.randomBytes(256, function(ex, buffer) {
                 token = buffer.toString('hex');});



            const client = await Client.findOne({ email: email });

                    if (!client) {
                        throw new Error('error', 'No account with that email found.');
                    }
                    client.resetToken = token;
                    client.resetTokenExpiration = Date.now() + 3600000;
                    await client.save();
        const request = await mailjet
            .post("send", {'version': 'v3.1'})
            .request({
                "Messages":[
                    {
                        "From": {
                            "Email": "maxforce7@gmail.com",
                        },
                        "To": [
                            {
                                "Email": email,
                            }
                        ],
                        "Subject": "Password reset",
                        "HTMLPart": `<h1>You requested a password reset</h1>
                                     <p>Click this <a href=\"http://localhost:8080/reset/${token}\">link</a> to set a new password.</p>`,

                    }
                ]
            });


                    return "Reset password token sended successfully please check your email";

    },

    clientChangePassword: async function({token, password}, req) {
        const client = await Client.findOne({resetToken: token});


        if (!client || client.resetPasswordExpires > Date.now())
            throw new Error("Reset password token is invalid or expired");

        const pw = await bcrypt.hash(password, 12);
        client.password = pw;
        client.resetPasswordToken = null;
        client.resetPasswordExpires = null;

        await client.save();

        const request = await mailjet
            .post("send", {'version': 'v3.1'})
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": "maxforce7@gmail.com",
                        },
                        "To": [
                            {
                                "Email": client.email,
                            }
                        ],
                        "Subject": "Password Changed",
                        "HTMLPart": `<h1>Your password has been changed !</h1>`,

                    }
                ]
            });

        return client;

    },




    clientAddCourse: async function({idClient, idCourse}, req) {
        if (!req.isAuth) {
            const error = new Error('Not authenticated!');
            error.code = 401;
            throw error;
        }
        const client = await Client.findById(idClient);
        if (!client)
            throw new Error('No Client Found !');

        const course = await Course.findById(idCourse);
        if (!course)
            throw new Error('No course Found !');

        client.courses.enrolled.push(course);
        await client.save();
        const request = await mailjet
            .post("send", {'version': 'v3.1'})
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": "maxforce7@gmail.com",
                        },
                        "To": [
                            {
                                "Email": client.email,
                            }
                        ],
                        "Subject": "Course Added",
                        "HTMLPart": `<h1>${course.name} has been added to your account !</h1>`,

                    }
                ]
            });
        return client;

    },



};