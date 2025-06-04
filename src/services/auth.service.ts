import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { users, User } from "../models/user.model";
import { generateError } from "../utils/generateError";

interface SignupInput {
   email: string;
   password: string;
   name: string;
}

interface LoginInput {
   email: string;
   password: string;
}

export async function signupService({ email, password, name }: SignupInput): Promise<User> {
   const userExists = users.find((u) => u.email === email);

   if (userExists) throw generateError(400, "EMAIL_ALREADY_EXISTS");

   const hashedPassword = await bcrypt.hash(password, 10);
   const newUser: User = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date(),
   };

   users.push(newUser);
   return newUser;
}

export async function loginService({ email, password }: LoginInput): Promise<User> {
   const user = users.find((u) => u.email === email);
   if (!user) {
      throw generateError(401, "USER_NOT_FOUND");
   }

   const isPasswordValid = await bcrypt.compare(password, user.password);
   if (!isPasswordValid) {
      throw generateError(401, "WRONG_PASSWORD");
   }

   return user;
}
