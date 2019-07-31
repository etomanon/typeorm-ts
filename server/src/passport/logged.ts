import { Request, Response } from "express";

export const logged = (req: Request, res: Response, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/api/auth/twitch");
  }
};
