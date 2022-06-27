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
    authors: String
    title: String
    description: String
    bookId: String
    image: String
    link: String
  }

  type Query {
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
