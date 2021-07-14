import { gql } from "@apollo/client";

export const ADD_EXPENSE = gql`
  mutation addExpense($name: String!, $amount: Int!) {
    addExpense(name: $name, amount: $amount) {
      id
      name
      amount
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation updateExpense($id: ID!, $name: String!, $amount: Int!) {
    updateExpense(id: $id, name: $name, amount: $amount) {
      id
      name
      amount
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_EXPENSE = gql`
  mutation deleteExpense($id: ID!) {
    deleteExpense(id: $id)
  }
`;
