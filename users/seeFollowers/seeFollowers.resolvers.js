import client from "../../client";

export default {
    Query: {
        seeFollowers: async (_,{ userId, page}) => {
            const followers = await client.user
            .findUnique({where:{userId}})
            .followers({
                take: 5,
                skip: (page - 1)*5,
            });
            console.log(followers);
            return {
                ok: true,
                followers,
            };
        },
    },
};