const { User, Lessons } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('lessons');
        },
        lessons: async () => {
            try {
                const lessons = await Lessons.find({ title: { $ne: null } });
                return lessons;
            } catch (err) {
                throw new ApolloError('Failed to fetch lessons');
            }
        },
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
        addUser: async (parent, { username, email, firstName, lastName, password }) => {
            const user = await User.create({ username, email, firstName, lastName, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Username no match");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("pw bad");
            }

            const token = signToken(user);

            return { token, user };
        },
        addLesson: async (parent, { title, date, start, end }) => {
            const addLesson = await Lessons.create({ title, date, start, end });
            return addLesson;
        },
        removeLessons: async () => {
            try {
                const removedLessons = await Lessons.deleteMany({ title: null });
                return removedLessons;
            } catch (err) {
                throw new ApolloError('Failed to remove lessons');
            }
        },

        // remove lesson logic
        //update rider level logic
    }
}

module.exports = resolvers;