const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User
                    .findOne({ _id: context.user._id })
                    .select("-__v -password")

                return userData;
            };
            throw AuthenticationError("You must be logged in!");
        },
    },


    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError("Login credentials are incorrect");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw AuthenticationError("Login credentials are incorrect");
            }
            const token = signToken(user);

            return { token, user };
        },
        addLesson: async (parent, { lessonType, maxRiders, time }) => {
            const newLesson = await Lessons.create({ lessonType, maxRiders, time });
            return { newLesson };
        },
        // remove lesson logic
        //update rider level logic
    }
}

module.exports = resolvers;