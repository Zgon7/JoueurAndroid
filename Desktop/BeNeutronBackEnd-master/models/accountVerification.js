const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountVerificationSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        tokenExpiration: {
            type: String,
            required: true
        }

    });


module.exports = mongoose.model('AccountVerification', accountVerificationSchema);
