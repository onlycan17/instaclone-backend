import client from "../../client";

 export default {
   Query: {
     seeProfile: (_, { userId }) => {
      return client.user.findUnique({
         where: {
           userId,
         },
       });
    },
   },
 };