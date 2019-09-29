const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }

);

module.exports = mongoose.model('Document', documentSchema);
