import { async } from "regenerator-runtime";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default{
    Mutation : {
        unfollowUser: protectedResolver(async (_,{userId}, {loggedInUser})=> {
           const ok = await client.user.findUnique({
               where: {userId},
           });
           if(!ok){
               return {
                   ok:false,
                   error: "Can't unfollow user.",
               };
           }
           await client.user.update({
               where: {
                   id: loggedInUser.id,
               },
               data: {
                   following: {
                       disconnect: {
                           userId
                       }
                   }
               }
           });
           return {
               ok: true
           } 
        }) 
    }
    
}