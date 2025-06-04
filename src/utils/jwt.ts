import jwt from "jsonwebtoken";
import { generateError } from "./generateError";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(payload: object): string {
   if (JWT_SECRET) return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
   else throw generateError(500, "JWT_NOT_FOUND");
}

export function verifyToken(token: string): any {
   if (JWT_SECRET) return jwt.verify(token, JWT_SECRET);
   else throw generateError(500, "JWT_NOT_FOUND");
}
