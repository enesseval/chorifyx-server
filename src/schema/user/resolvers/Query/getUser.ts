import { User } from "../../../../models/user.model";
import type { QueryResolvers } from "./../../../types.generated";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUser: NonNullable<QueryResolvers['getUser']> = async (_parent, _, { req }) => {
   const token = req.cookies["access-token"];

   if (!token) throw new Error("Token bulunamadı");

   let decodedToken;
   try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
   } catch (error) {
      throw new Error("Token doğrulanamadı");
   }

   const user = await User.findById(decodedToken.userId);

   if (!user) throw new Error("Kullanıcı bulunamadı");

   return user;
};
