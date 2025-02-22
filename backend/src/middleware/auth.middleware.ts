import { Response, NextFunction } from "express";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { User, UserRole } from "../models/user.model";

// Extend Express Request type to include User
declare global {
  namespace Express {
    interface Request {
      User?: {
        id: string;
        google_id: string;
        email: string;
        display_name: string;
        role: "host" | "renter" | "admin";
      };
    }
  }
}

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No token provided", data: null, status: "failed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.User = decoded as User;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token", data: null, status: "failed" });
  }
};

export const isHost = (req: Request, res: Response, next: NextFunction) => {
  if (!req.User || req.User?.role !== UserRole.HOST) {
    return res.status(403).json({
      message: "Forbidden - Host access required",
      data: null,
      status: "failed",
    });
  }
  next();
};

export const isRenter = (req: Request, res: Response, next: NextFunction) => {
  if (!req.User || req.User?.role !== UserRole.RENTER) {
    return res.status(403).json({
      message: "Forbidden - Renter access required",
      data: null,
      status: "failed",
    });
  }
  next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.User || req.User?.role !== UserRole.ADMIN) {
    return res
      .status(403)
      .json({
        message: "Forbidden - Admin access required",
        data: null,
        status: "failed",
      });
  }
  next();
};

export const isHostOrRenter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.User ||
    (req.User?.role !== UserRole.HOST && req.User?.role !== UserRole.RENTER)
  ) {
    return res
      .status(403)
      .json({
        message: "Forbidden - Host or Renter access required",
        data: null,
        status: "failed",
      });
  }
  next();
};
