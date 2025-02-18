import { Request, Response, NextFunction } from "express";
import { User, UserRole } from "../models/user.model";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const isHost = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== UserRole.HOST) {
    return res
      .status(403)
      .json({ message: "Forbidden", data: null, status: "failed" });
  }
  next();
};

export const isRenter = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== UserRole.RENTER) {
    return res
      .status(403)
      .json({ message: "Forbidden", data: null, status: "failed" });
  }
  next();
};
