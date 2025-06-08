import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";

const populateUser = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const user = await User.findOne({
         where: { id: req.userId },
      });

      if (!user) return res.status(401).json({ errorMessage: "USER_NOT_FOUND" });

      req.user = {
         name: user.name,
         surname: user.surname,
         username: user.username,
         email: user.email,
         verificationAttempts: user.verificationAttempts,
         verificationCodeExpires: user.verificationCodeExpires,
         isVerified: user.isVerified,
      };
      next();
   } catch (error) {
      return res.status(500).json({ errorMessage: "SERVER_ERROR" });
   }
};

export default populateUser;
