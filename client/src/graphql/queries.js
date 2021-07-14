import { gql } from "@apollo/client";

export const GET_EXPENSES = gql`
  query getExpenses {
    getExpenses {
      id
      name
      amount
      createdAt
      updatedAt
    }
  }
`;
