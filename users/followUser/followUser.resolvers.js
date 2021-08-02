import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
    Mutation : {
        followUser: protectedResolver(async (_,{userId}, { loggedInUser })=> {
            const ok = await client.user.findUnique({ where: { userId}});
            if(!ok){
                return {
                    ok: false,
                    error: "That user does not exist.",
                };
            }
            await client.user.update({
                where: {
                    id: loggedInUser.id,
                },
                data: {
                    following: {
                        connect: {
                            userId
                        },
                    },
                },
            });

            return {
                ok: true
            };
        }),
    }
}