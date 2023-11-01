const { User, Lessons } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
    Query: {
        users: async () => {
            //Find users and populate lessons
            return User.find().populate('lessons');
        },
        lessons: async () => {
            //find lessons, filtered to ensure only lessons with non-null names show
            try {
                const lessons = await Lessons.find({ title: { $ne: null } }).populate('users');
                return lessons;
            } catch (err) {
                throw new ApolloError('Failed to fetch lessons');
            }
        },
        me: async (parent, args, context) => {
            //if user exists, use _id to view all of the user's information
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
            //Create a user
            const user = await User.create({ username, email, firstName, lastName, password });
            //Assign JW token for the user
            const token = signToken(user);
            return { token, user };
        },
        // ::BACK-END USE CURRENTLY
        updateUser: async (parent, { id, input }, context) => {
            //Find user by id and update user with inputted data
            const updatedUser = await User.findOneAndUpdate({ _id: id }, input, {
                new: true,
            }).exec();

            if (!updatedUser) {
                throw new Error('User not found');
            }

            return updatedUser;
        },
        // ::BACK-END USE CURRENTLY
        removeUser: async (parent, { userId }) => {
            //Find Lesson by ID and deletes it
            try {
                const removedUser = await User.findByIdAndDelete(userId);
                return removedUser;
            } catch (err) {
                throw new ApolloError('Failed to remove user');
            }
        },
        // ::BACK-END USE CURRENTLY
        removeUsers: async () => {
            try {
                const removedUsers = await User.deleteMany({ role: "user" });
                return removedUsers;
            } catch (err) {
                throw new ApolloError('Failed to remove users');
            }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            // Make sure the user is authenticated
            if (!user) {
                throw new AuthenticationError("Login information is incorrect");
            }
            //Checks password is correct
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Login information is incorrect");
            }
            //Assigns JW token to user
            const token = signToken(user);
            //Communciates token, user info and wwhat role the user has
            return { token, user, role: User.role };
        },
        addLesson: async (parent, { title, date, start, end, limit }) => {
            //Create lesson with the given information
            const addLesson = await Lessons.create({ title, date, start, end, limit });
            return addLesson;
        },
        //BACK-END USE CURRENTLY:: removeLessons currently just used for backend deleting, can be changed to delete bulk lessons with any title
        removeLessons: async () => {
            try {
                const removedLessons = await Lessons.deleteMany({ title: null });
                return removedLessons;
            } catch (err) {
                throw new ApolloError('Failed to remove lessons');
            }
        },
        removeLesson: async (parent, { lessonId }) => {
            //Find Lesson by ID and deletes it
            try {
                const removedLesson = await Lessons.findByIdAndDelete(lessonId);
                return removedLesson;
            } catch (err) {
                throw new ApolloError('Failed to remove lesson');
            }
        },
        bookLesson: async (_, { lessonId }, context) => {
            // Make sure the user is authenticated
            if (!context.user) {
                throw new AuthenticationError('Not logged in');
            }

            try {
                //Find lesson by ID
                const lesson = await Lessons.findById(lessonId);

                if (!lesson) {
                    throw new Error('Lesson not found');
                }
                //Find user by ID
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
        },
        cancelLesson: async (_, { lessonId }, { user }) => {
            // Make sure the user is authenticated
            if (!user) {
                throw new AuthenticationError('You must be logged in to cancel a lesson');
            }

            try {
                // Remove the lesson from the user's lessons array
                const updatedUser = await User.findByIdAndUpdate(
                    user._id,
                    { $pull: { lessons: lessonId } },
                    { new: true }
                );

                // Remove the user from the lesson's user array
                await Lessons.findByIdAndUpdate(
                    lessonId,
                    { $pull: { users: user._id } }
                );

                return updatedUser;
            } catch (err) {
                console.log(err);
                throw new Error('Failed to cancel the lesson');
            }
        },
    },
}


module.exports = resolvers;