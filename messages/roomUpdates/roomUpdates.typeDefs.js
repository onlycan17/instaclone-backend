import { gql } from "apollo-server";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";

export default gql`
  type Subscription {
    roomUpdates(id: Int!): Message
  }
`;
