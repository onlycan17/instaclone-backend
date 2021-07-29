import { async } from "regenerator-runtime";
import client from "../../client";
import bcrypt from "bcrypt";


export default {
  Mutation: {
    createAccount: async (_, { userId, userName, email, password }) => {
      try {
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
        if (existingUser) {
          throw new Error("This userId/password is already taken.");
        }
        const uglyPassword = await bcrypt.hash(password, 10);

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
