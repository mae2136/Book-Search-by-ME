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
    authors: [String]
    bookId: String!
    description: String
    image: String
    title: String
    link: String
  }

  input BookInput {
    authors: [String]
    bookId: String!
    description: String
    image: String
    title: String
    link: String
  }

  type Query {
    me(_id: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: BookInput): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
