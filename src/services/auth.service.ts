import { generateError } from "../utils/generateError";
import User from "../models/user.model";

interface SignupInput {
   email: string;
   password: string;
   name: string;
   surname: string;
   username: string;
   authProvider: "email" | "google";
   verificationCode: string;
   verificationCodeExpires: Date;
}

interface LoginInput {
   email: string;
   password: string;
}

export async function registerService(input: SignupInput): Promise<User> {
   const { email, password, name, surname, username, authProvider, verificationCode, verificationCodeExpires } = input;

   const userExists = await User.findOne({ where: { email } });
   if (userExists) {
      throw generateError(400, "EMAIL_ALREADY_EXISTS");
   }

   const user = await User.create({
      email,
      password,
      name,
      surname,
      username,
      authProvider,
      verificationCode,
      verificationCodeExpires,
   });

   return user;
}

export async function verifyEmailService(email: string, code: string): Promise<void> {
   const user = await User.findOne({ where: { email } }); // 👈 await EKLENDİ

   if (!user) throw generateError(404, "USER_NOT_FOUND");

   if (user.isVerified) throw generateError(400, "EMAIL_ALREADY_VERIFIED");

   if (!user.verificationCode || !user.verificationCodeExpires) throw generateError(400, "NO_VERIFICATION_CODE");

   const isCodeValid = user.verificationCode === code && user.verificationCodeExpires > new Date();

   if (!isCodeValid) throw generateError(400, "INVALID_OR_EXPIRED_CODE");

   user.isVerified = true;
   user.verificationCode = null;
   user.verificationCodeExpires = null;

   await user.save(); // 🔁 Veritabanında değişiklikleri kaydetmeyi unutma
}
