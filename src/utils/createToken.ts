import { Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const createTokenAndSetCookies = async (userId: string, res: Response) => {
   try {
      const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY!, { expiresIn: "1h" });
      const refreshToken = jwt.sign({ userId }, process.env.JTW_REFRESH_SECRET_KEY!, { expiresIn: "7d" });

      await User.findByIdAndUpdate(userId, { refreshToken: refreshToken });

      const cookieOptions = {
         httpOnly: true,
         samSite: "strict" as const,
         maxAge: 60 * 60 * 1000,
      };

      res.cookie("access-token", accessToken, {
         ...cookieOptions,
         secure: process.env.NODE_ENV === "production",
      });
      return { accessToken };
   } catch (error) {
      throw new Error(`Tokeb oluşturulurken bir hata oluştu: ${error}`);
   }
};