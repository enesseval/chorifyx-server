import { Request, Response, NextFunction } from "express";
import { registerService, verifyEmailService } from "../services/auth.service";
import { generateToken } from "../utils/jwt";
import User from "../models/user.model";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import templates from "../utils/mailer/templates";
import { sendMail } from "../utils/mailer/sendMail";

export async function registerController(req: Request, res: Response, next: NextFunction) {
   try {
      const { email, password, name, surname } = req.body;
      const username = await User.generateUniqueUsername(name, surname);

      const verificationCode = generateVerificationCode();
      const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000);

      const user = await registerService({
         email,
         password,
         name,
         surname,
         username,
         authProvider: "email",
         verificationCode,
         verificationCodeExpires,
      });

      // Mail gönder
      const { subject, html } = templates.verifyCode(name, verificationCode);
      await sendMail({ to: email, subject, html });

      // JWT oluştur ve cookie'ye yaz
      const token = generateToken({ userId: user.id });
      res.cookie("accessToken", token, {
         httpOnly: true,
         sameSite: "lax",
         secure: process.env.NODE_ENV === "production",
         maxAge: 1000 * 60 * 60 * 24,
      });

      res.status(201).json({
         message: "USER_CREATED_AND_VERIFICATION_SENT",
         user: {
            id: user.id,
            email: user.email,
            name: user.name,
            username: user.username,
            token,
         },
      });
   } catch (error) {
      next(error);
   }
}

export async function verifyCodeController(req: Request, res: Response, next: NextFunction): Promise<void> {
   const { code } = req.body;
   const id = req.userId;

   console.log(req.userId);

   try {
      const user = await User.findOne({ where: { id: id } });

      if (!user) {
         res.status(400).json({ errorCode: "USER_NOT_FOUND" });
         return;
      }

      await verifyEmailService(user.email, code);

      res.status(200).json({ message: "VERIFIED" });
   } catch (error) {
      next(error);
   }
}

// export async function loginController(req: Request, res: Response, next: NextFunction) {
//    try {
//       const { email, password } = req.body;
//       const user = await loginService({ email, password });

//       const token = generateToken({ userId: user.id });

//       res.cookie("token", token, {
//          httpOnly: true,
//          sameSite: "lax",
//          secure: process.env.NODE_ENV === "production",
//          maxAge: 1000 * 60 * 60 * 24,
//       });

//       res.status(200).json({
//          message: "LOGIN_SUCCESSFUL",
//          user: {
//             id: user.id,
//             email: user.email,
//             name: user.name,
//          },
//       });
//    } catch (error) {
//       next(error);
//    }
// }

// export async function logoutController(req: Request, res: Response) {
//    res.clearCookie("token");
//    res.status(200).json({ message: "LOGOUT_SUCCESSFUL" });
// }
