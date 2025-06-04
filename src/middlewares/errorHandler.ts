import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
   const status = err.statusCode || 500;
   const message = err.message || "INTERNAL_SERVER_ERROR";

   res.status(status).json({
      status: "error",
      error: message,
   });
}
