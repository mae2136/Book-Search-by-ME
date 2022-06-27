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

  type Auth {
    token: ID!
    user: User
  }

  type Book {
    _id: ID
    title: String
    description: String
    bookId: String
    image: String
    link: String
    authors: [String]
  }

  input BookInput {
    title: String
    description: String
    bookId: String
    image: String
    link: String
    authors: [String]
  }

  type Query {
    me(_id: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(savedBooks: BookInput): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
