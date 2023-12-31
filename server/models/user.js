const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

//User model
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    level: {
        type: String,
    },
    role: {
        type: String,
        default: "user"
    },
    lessons: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lessons',
            autopopulate: true,
        },
    ],
});

//Password encrypting
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

//Checks password against encrypted password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

//Auto-populate
userSchema.plugin(require('mongoose-autopopulate'));

const User = model('User', userSchema);

module.exports = User;
