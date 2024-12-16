import { User } from "../../../../models/user.model";
import { createTokenAndSetCookies } from "../../../../utils/createToken";
import type { MutationResolvers } from "./../../../types.generated";
import bcrypt from "bcryptjs";
import { ApolloError } from "apollo-server";

export const login: NonNullable<MutationResolvers["login"]> = async (_parent, { email, password }, context) => {
   const { res } = context;

   try {
      const user = await User.findOne({ email });

      if (!user) throw new ApolloError("Lütfen email adresinizi kontrol ediniz.", "USER_NOT_FOUND");

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) throw new ApolloError("Lütfen şifrenizi kontrol ediniz.", "INVALID_PASSWORD");

      await createTokenAndSetCookies(user.id, res);

      return {
         username: user.username,
      };
   } catch (error) {
      console.log(error);
      throw new ApolloError(`Bir hata oluştu: ${error}`, "LOGIN_FAILED");
   }
};
