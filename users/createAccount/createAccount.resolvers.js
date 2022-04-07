import { async } from "regenerator-runtime";
import client from "../../client";
import bcrypt from "bcryptjs";


export default {
  Mutation: {
    createAccount: async (_, { userId, userName, email, password }) => {
      console.log('log param : '+ userId, userName, email, password);
      try {
        console.log('test!!!!!');
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                userId,
              },
              {
                email,
              },
            ],
          },
        });
        console.log(existingUser);
        if (existingUser) {
          throw new Error("This userId/password is already taken.");
        }
        console.log('password bcrypt----');
        const uglyPassword = await bcrypt.hashSync(password, 10);
        console.log(uglyPassword);
        const user = await client.user.create({
          data: {
            userId,
            userName,
            email,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Can't create account.",
        }
      }
    },
  },
};
