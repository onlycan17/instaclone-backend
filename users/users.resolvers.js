import client from "../client";

export default{
    User: {
        totalFollowing: (root) =>
            client.user.count({
                where: {
                    followers:{
                        some:{
                            id,
                        },
                    },
                },
            }), 
        totalFollowers: ({ id }) => 
            client.user.count({
                where: {
                    following:{
                        some:{
                            id,
                        },
                    },
                },
            }),
        isMe:({id}, _, { loggedInUser}) => {
            if(!loggedInUser){
                return false;
            }
        },
    },
};