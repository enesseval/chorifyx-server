import { ApolloError } from "apollo-server";
import { User } from "../../../../models/user.model";
import type { QueryResolvers } from "./../../../types.generated";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUser: NonNullable<QueryResolvers['getUser']> = async (_parent, { username }, { req }) => {
   const token = req.cookies["access-token"];

   if (!token) throw new ApolloError("Token bulunamadı");

   let decodedToken;
   try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
   } catch (error) {
      throw new ApolloError("Token doğrulanamadı");
   }

   const user = await User.findById(decodedToken.userId);

   if (username !== user?.username) {
      const error = new ApolloError("Yetkisiz erişim.");
      error.correctUsername = user?.username;

      throw error;
   }

   if (!user) throw new ApolloError("Kullanıcı bulunamadı");

   return user;
};
