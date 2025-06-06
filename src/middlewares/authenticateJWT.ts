import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
   const token = req.cookies?.accessToken;

   if (!token) {
      res.status(401).json({ errorMessage: "NOT_AUTHENTICATED" });

      return;
   }
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      req.userId = decoded.userId;

      next();
   } catch (error) {
      console.log("JWT verification failed", error);
      res.status(403).json({ errorMessage: "INVALID_TOKEN" });
   }
};

export default authenticateJWT;
