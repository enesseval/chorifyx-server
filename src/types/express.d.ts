import "express";

declare global {
   namespace Express {
      interface Request {
         userId: string;
      }
   }
}

export {};

export function Router() {
   throw new Error("Function not implemented.");
}
