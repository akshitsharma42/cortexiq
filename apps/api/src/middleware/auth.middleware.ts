import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/jwt";
import User from "../models/user.model";

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Access token is required") as any;
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyAccessToken(token);

    const user = await User.findById(payload.userId);
    if (!user) {
      const error = new Error("User not found") as any;
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Invalid or expired token";
    }
    next(error);
  }
}
