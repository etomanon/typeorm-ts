import { Request, Response } from "express";

export const logged = (req: Request, res: Response, next) => {
  console.log("req.user", req.user);
  if (req.user) {
    return next();
  } else {
    return res.status(401).json({ message: "Not logged in" });
  }
};
