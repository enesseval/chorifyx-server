import { Request, Response, NextFunction } from "express";
import { loginService, signupService } from "../services/auth.service";
import { generateToken } from "../utils/jwt";

export async function signupController(req: Request, res: Response, next: NextFunction) {
   try {
      const { email, password, name } = req.body;
      const user = await signupService({ email, password, name });

      const token = generateToken({ userId: user.id });

      res.cookie("token", token, {
         httpOnly: true,
         sameSite: "lax",
         secure: process.env.NODE_ENV === "production",
         maxAge: 1000 * 60 * 60 * 24,
      });

      res.status(201).json({
         message: "USER_CREATED",
         user: {
            id: user.id,
            email: user.email,
            name: user.name,
         },
      });
   } catch (error) {
      next(error);
   }
}

export async function loginController(req: Request, res: Response, next: NextFunction) {
   try {
      const { email, password } = req.body;
      const user = await loginService({ email, password });

      const token = generateToken({ userId: user.id });

      res.cookie("token", token, {
         httpOnly: true,
         sameSite: "lax",
         secure: process.env.NODE_ENV === "production",
         maxAge: 1000 * 60 * 60 * 24,
      });

      res.status(200).json({
         message: "LOGIN_SUCCESSFUL",
         user: {
            id: user.id,
            email: user.email,
            name: user.name,
         },
      });
   } catch (error) {
      next(error);
   }
}

export async function logoutController(req: Request, res: Response) {
   res.clearCookie("token");
   res.status(200).json({ message: "LOGOUT_SUCCESSFUL" });
}
