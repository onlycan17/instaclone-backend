import client from "../../client";

export default {
    Query: {
        seeFollowers: async (_,{ userId, page}) => {
            const ok = await client.user.findUnique({
                where: {userId},
                select: {id: true},
            });
            if(!ok){
                return {
                    ok: false,
                    error: "User not found.",
                }
            }

            const followers = await client.user
            .findUnique({where:{userId}})
            .followers({
                take: 5,
                skip: (page - 1)*5,
            });
            const totalFollowers = await client.user.count({
                where: { following: { some: {userId}}},
            });
            console.log(totalFollowers);
            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers / 5),
            };
        },
    },
};