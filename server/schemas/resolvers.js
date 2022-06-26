const { Book, User } = require('../models');

const resolvers = {
    Query: {
        // Get all users
        users: async () => {
            return User.find();
        },
        // Get one user by username
        user: async (parent, { username }) => {
            return User.findOne({ username: username });
        },
        // Get all books
        books: async () => {
            return Book.find();
        },
        // Get one book by id
        book: async (parent, { bookId }) => {
            return Book.findOne({ _id: bookId })
        }
    },

    Mutation: {
        // Create new Book using arguments
        addBook: async (parent, args) => {
            const book = await Book.create(args);
            // Then add book id to users savedBooks array
            await User.findOneAndUpdate(
                { username: args.username },
                {
                    $addToSet: { savedBooks: book._id }
                },
            );

            return book;
        },
    }
};

module.exports = resolvers;