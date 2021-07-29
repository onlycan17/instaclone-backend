import { gql } from "apollo-server";

export default gql `
type CreateAccountResult {
    ok: Boolean!
    error: String
}
type Mutation {
    createAccount(
      userId: String!
      userName: String!
      email: String!
      password: String!
    ): User
  }
`;