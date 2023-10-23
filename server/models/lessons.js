const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const lessonSchema = new Schema({
    lessonType: {
        type: String,
        required: true,
    },
    maxRiders: {
        type: String,
        required: true,
        trim: true,
    },
    time: {
        type: Date,
        get: (timestamp) => dateFormat(timestamp),
    },
});

const Thought = model('Lessons', lessonSchema);

module.exports = Thought;
