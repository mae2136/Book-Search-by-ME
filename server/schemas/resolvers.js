const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // Get the user
        me: async (parent, { _id }) => {
            return User.findOne({ _id: _id }).populate('savedBooks');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        // saveBook if logged in
        saveBook: async (parent, args, context) => {
            console.log(context.user);
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: { savedBooks: { ...args } }
                    },
                    { new: true }
                );

                console.log(user);

                return user;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // deleteBook if logged in
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );

                return updatedUser
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
};

module.exports = resolvers;