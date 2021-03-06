import { async } from "regenerator-runtime";
import client from "../../client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export default {
  Mutation: {
    login : async (_,{userId,password}) => {
        const user = await client.user.findFirst({
            where: {userId}
        });
        if(!user){
            return {
                ok: false,
                error: "User not found.",
            };
        }
        const passwordOk = await bcrypt.compareSync(password,user.password);
        if(!passwordOk){
            return {
                ok: false,
                error: "Incorrect password.",
            }
        }
        const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY);
        console.log(token);
        return{
          ok: true,
          token,
        }
    }
  },
};
