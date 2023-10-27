const { Schema, model } = require('mongoose');


const lessonSchema = new Schema({
    title: {
        type: String,

    },
    date: {
        type: String,

        trim: true,
    },
    start: {
        type: String,

    },
    end: {
        type: String,

    },
});

const Lessons = model('Lessons', lessonSchema);

module.exports = Lessons;
