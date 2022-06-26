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
            return User.findOne({ username: username }).populate('savedBooks');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            const token = signToken(user);

            return { token, user };
        },
        // Create new Book using arguments
        // addBook: async (parent, args) => {
        //     const book = await Book.create(args);
        //     // Then add book id to users savedBooks array
        //     await User.findOneAndUpdate(
        //         { username: args.username },
        //         {
        //             $addToSet: { savedBooks: book._id }
        //         },
        //     );

        //     return book;
        // },
    }
};

module.exports = resolvers;