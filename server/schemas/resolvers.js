const { User, Lessons } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('lessons');
        },
        lessons: async () => {
            try {
                const lessons = await Lessons.find({ title: { $ne: null } }).populate('users');
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
        updateUser: async (parent, { id, input }, context) => {
            const updatedUser = await User.findOneAndUpdate({ _id: id }, input, {
                new: true,
            }).exec();

            if (!updatedUser) {
                throw new Error('User not found');
            }

            return updatedUser;
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

            return { token, user, role: User.role };
        },
        addLesson: async (parent, { title, date, start, end, limit }) => {
            const addLesson = await Lessons.create({ title, date, start, end, limit });
            return addLesson;
        },
        //removeLessons currently just used for backend deleting
        removeLessons: async () => {
            try {
                const removedLessons = await Lessons.deleteMany({ title: null });
                return removedLessons;
            } catch (err) {
                throw new ApolloError('Failed to remove lessons');
            }
        },
        removeLesson: async (parent, { lessonId }) => {
            try {
                const removedLesson = await Lessons.findByIdAndDelete(lessonId);
                return removedLesson;
            } catch (err) {
                throw new ApolloError('Failed to remove lesson');
            }
        },
        bookLesson: async (_, { lessonId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('Not logged in');
            }

            try {
                const lesson = await Lessons.findById(lessonId);

                if (!lesson) {
                    throw new Error('Lesson not found');
                }

                const user = await User.findById(context.user._id);

                if (!user) {
                    throw new Error('User not found');
                }

                // Check if the lesson is already in the user's lessons array
                const isBooked = user.lessons.some((lesson) => lesson.equals(lessonId));

                if (isBooked) {
                    throw new Error('Lesson is already booked');
                }

                // Push lesson into user's lessons array
                user.lessons.push(lessonId);

                // Push user into lesson's users array
                lesson.users.push(user._id);

                await Promise.all([user.save(), lesson.save()]);

                return user;
            } catch (err) {
                console.error(`Error booking lesson: ${err}`);
                throw new Error('Could not book lesson');
            }
        }
    },
}


// remove lesson logic
//update rider level logic

module.exports = resolvers;