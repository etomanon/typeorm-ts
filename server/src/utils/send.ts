import { Request, Response } from "express";
import got from "got";

import { isValidToken } from "../passport/isValidToken";

// send JSON from api request if token is valid
export const send = async (
  req: Request,
  res: Response,
  api: got.Response<any>,
  originalController
) => {
  try {
    const isValid = await isValidToken(req, res, api, originalController);
    if (typeof isValid === "boolean" && isValid) {
      return res.json(api.body.data);
    }
    return isValid;
  } catch (e) {
    console.log("ERROR", e);
  }
};
