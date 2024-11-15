const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const chapterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    numberLessons: {
        type: Number,
        required: true
    },
});

const Chapters = mongoose.model('Chapters', chapterSchema);

module.exports = Chapters;