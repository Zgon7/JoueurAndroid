const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const qcmSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },

        questionAnswer:
            [
                {
                    question: {type: String, required: true},
                    answers: [
                                {
                                    all: [{type: String}],
                                    right: [{type: String}]
                                }
                             ]
                }
                ]


    }
);

module.exports = mongoose.model('Qcm', qcmSchema);
