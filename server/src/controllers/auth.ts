import { Request, Response } from "express";

export const authGetCallback = (req: Request, res: Response) => {
  // Successful authentication
  if (req.user) {
    return res.redirect("/dashboard");
  }
  return res.redirect("/");
};

export const authGetLogout = (req: Request, res: Response) => {
  req.logout();
  return res.redirect("/");
};
