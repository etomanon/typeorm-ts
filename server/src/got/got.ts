import { Request } from "express";
import got from "got";

const gotBasic = got.extend({
  baseUrl: "https://api.twitch.tv/helix",
  json: true
});

export const gotToken = (url: string, req: Request) => {
  return gotBasic.get(url, {
    headers: { Authorization: `Bearer ${req.user.accessToken}` }
  });
};

export const gotClientId = (url: string) => {
  return gotBasic.get(url, { headers: { "Client-ID": process.env.CLIENT_ID } });
};
