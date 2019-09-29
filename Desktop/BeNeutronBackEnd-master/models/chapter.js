const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterSchema = new Schema(
    {
        Name: {
            type: String,
            required: true
        }
    }

);

module.exports = mongoose.model('Chapter', chapterSchema);
