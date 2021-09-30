import bcrypt from "bcrypt";
import {createWriteStream} from "fs";
import client from "../../client";
import { protectedResolver } from "../users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

const resolverfn = async (
  _,
  { userName, userId, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  let avatarUrl = null;
  console.log(avatar);
  if(avatar){
    console.log('avatarIn!');
    avatarUrl = await uploadToS3(avatar, loggedInUser.id, "avatars");
    // const {filename, createReadStream} = await avatar;
    // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    // const readStream = createReadStream();
    // const writeStream = createWriteStream(
    //   process.cwd() + "/uploads/" + newFilename
    // );
    // readStream.pipe(writeStream);
    // avatarUrl = `http://localhost:${process.env.PORT}/static/${newFilename}`;
  }
  console.log(avatarUrl);
  let uglyPassword = null;
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      userName,
      userId,
      email,
      bio,
      ...(uglyPassword && { password: uglyPassword }),
      ...(avatarUrl && {avatar: avatarUrl}),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: "Could not update profile.",
    };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverfn),
  },
};
