import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    userId: String!
    userName: String!
    email: String!
    password: String!
    createAt: String!
    updateAt: String!
    bio: String
    avatar: String
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
  }
`;
