const { gql } = require('apollo-server-express');
// Define typeDefs based on Models
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
  }

  type Book {
    _id: ID
    authors: [authors]!
    title: String
    description: String
    bookId: String
    image: String
    link: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    books: [Book]
    book(bookId: ID!): Book
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addBook(): Book
  }
`;

module.exports = typeDefs;
