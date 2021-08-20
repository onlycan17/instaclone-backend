import client from "../../client";

export default{
    Query: {
        searchUsers: async (_, { keyword }) => 
            client.user.findMany({
                where: {
                    userId: {
                        startsWith: keyword.toLowerCase(),
                    },
                },
                skip: 0,
                take: 5,
            }),
    },
};