const { Schema, model } = require('mongoose');


const lessonSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        trim: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
});

const Lessons = model('Lessons', lessonSchema);

module.exports = Lessons;
