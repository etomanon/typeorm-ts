import { Request, Response } from "express";
import { getRepository } from "typeorm";
import got from "got";

import { User } from "../entities/User";

const getUrl = (refreshToken: string) =>
  `https://id.twitch.tv/oauth2/token--data-urlencode?grant_type=refresh_token&refresh_token=${encodeURIComponent(
    refreshToken
  )}&client_id=${encodeURIComponent(
    process.env.CLIENT_ID
  )}&client_secret${encodeURIComponent(process.env.CLIENT_SECRET)}`;

export const renewToken = async (req: Request) => {
  try {
    const userRepository = await getRepository(User);
    const { twitchId, refreshToken } = req.user;
    const user = await userRepository.findOne({ twitchId });
    const refreshUrl = getUrl(refreshToken);
    const refreshed: any = await got.post(refreshUrl, { json: true });
    user.accessToken = refreshed.accessToken;
    user.refreshToken = refreshed.refreshToken;
    return userRepository.save(user);
  } catch (e) {
    console.log("ERROR", e);
  }
};
