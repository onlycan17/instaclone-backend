import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createAccount(
      userId: String!
      userName: String!
      email: String!
      password: String!
    ): MutationResponse!
  }
`;
