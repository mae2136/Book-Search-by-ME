const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // Get all users
        users: async () => {
            return User.find();
        },
        // Get one user by username and associated books
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('savedBooks');
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
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
        // saveBook: async (parent, args) => {
        //     const user = await User.findOneAndUpdate(
        //         { username: req.user },
        //         {
        //             $addToSet: { savedBooks: args }
        //         },
        //         { new: true, runValidators: true }
        //     );

        //     return user;
        // },
        // deleteBook if logged in
    }
};

module.exports = resolvers;