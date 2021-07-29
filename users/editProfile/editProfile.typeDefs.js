import { gql } from "apollo-server";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      userName: String
      userId: String
      email: String
      password: String
      bio: String
      avatar: Upload
    ): EditProfileResult!
  }
`;
