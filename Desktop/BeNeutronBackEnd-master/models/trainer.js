const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainerSchema = new Schema(
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
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Trainer', trainerSchema);
