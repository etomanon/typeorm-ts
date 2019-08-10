import { Request, Response } from "express";

export const subOrAdmin = (req: Request, res: Response, next) => {
  if (req.user && (req.user.role === "sub" || req.user.role === "admin")) {
    return next();
  } else {
    return res.status(401).json({ message: "Subscribers and Admins only" });
  }
};
