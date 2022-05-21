import { async } from "regenerator-runtime";
import client from "../../client";

export default {
    Query: {
        seeFollowing: async(_, {userId, lastId}) => {
            const ok = await client.user.findUnique({
                where: {userId},
                select: {id:true},
            });
            if(!ok){
                return {
                    ok: false,
                    error: "User not found",
                }
            }
            const following = await client.user.findUnique({where: {userId}})
                .following({
                    take: 5,
                    skip: lastId ? 1: 0,
                    ...(lastId&&{cursor:{id: lastId}}),
                });
            return {
                ok: true,
                following,
            };
        },
    },
};