const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type Expense {
    id: ID!
    name: String!
    amount: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  # Queries
  type Query {
    getExpenses: [Expense!]!
  }

  # Mutation
  type Mutation {
    addExpense(name: String!, amount: Int!): Expense!
    updateExpense(id: ID!, name: String!, amount: Int!): Expense!
    deleteExpense(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
