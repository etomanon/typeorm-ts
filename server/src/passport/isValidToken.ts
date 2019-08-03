import { Request, Response } from "express";

import { renewToken } from "./renewToken";

// renew token if unauthorized response, if cannot renew loggin again
export const isValidToken = async (
  req: Request,
  res: Response,
  api,
  originalController
) => {
  if (api.statusCode === 401) {
    const refreshedUser = await renewToken(req);
    if (refreshedUser) {
      return originalController(req, res);
    } else {
      return res.redirect("/api/auth/twitch");
    }
  }
  return true;
};
