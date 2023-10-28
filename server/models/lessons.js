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
    limit: {
        type: String,

    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            autopopulate: true,
        },
    ],
});


lessonSchema.plugin(require('mongoose-autopopulate'));

const Lessons = model('Lessons', lessonSchema);

module.exports = Lessons;
