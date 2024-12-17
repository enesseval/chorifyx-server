import { ApolloError } from "apollo-server";
import { User } from "../../../../models/user.model";
import type { QueryResolvers, User as IUser } from "./../../../types.generated";
import jwt, { JwtPayload } from "jsonwebtoken";
export const getUsers: NonNullable<QueryResolvers["getUsers"]> = async (_parent, { username }, { req }) => {
   const token = req.cookies["access-token"];

   if (!token) throw new ApolloError("Token bulunamadı");

   let decodedToken;
   try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
   } catch (error) {
      throw new ApolloError("Token doğrulanamadı");
   }
   try {
      const users = await User.find({ username: { $regex: `^${username}`, $options: "i" } }, { name: 1, surname: 1, username: 1, profileImage: 1 });

      return users.map((user: IUser) => ({
         name: user.name,
         surname: user.surname,
         username: user.username,
         profileImage: user.profileImage,
      }));
   } catch (error) {
      console.log(error);
      throw new ApolloError(`Kullanıcılar getirilirken bir hata oluştu`);
   }
};
