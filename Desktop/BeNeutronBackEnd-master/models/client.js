const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        familyName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },
        birthday: {
            type: Date,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        resetToken: {
            type: String,
            default: null
        },
        resetTokenExpiration: {
            type: String,
            default: null
        },
        courses: {
            enrolled:
                  [
                    {
                        _id: {type: Schema.Types.ObjectId, ref: 'Course'},
                        orderDate: {type: Date, default: Date.now()}
                    }
                   ]
               }

    },



    { timestamps: true }
);


module.exports = mongoose.model('Client', clientSchema);
