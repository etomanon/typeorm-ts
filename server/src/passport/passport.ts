import { use, serializeUser, deserializeUser } from "passport";
import { Strategy } from "passport-twitch-new";
import { getRepository, Repository } from "typeorm";
import { config } from "dotenv";

import { User } from "../entities/User";
import { got } from "../got/got";
import { renewTokenStreamer } from "./renewToken";
config();

const admins = process.env.ADMINS.split(",");

const getSub = async (userRepository: Repository<User>, profileId: string) => {
  const streamer = await userRepository.findOne({
    twitchId: process.env.STREAMER_ID
  });
  return got.get(
    `subscriptions?broadcaster_id=${process.env.STREAMER_ID}&user_id=${profileId}`,
    {
      headers: { Authorization: `Bearer ${streamer.accessToken}` }
    }
  );
};

use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://clainadownload.cz/api/auth/twitch/callback",
      scope: "channel:read:subscriptions"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userRepository = await getRepository(User);
        let user = await userRepository.findOne({ twitchId: profile.id });

        let role;
        if (admins.indexOf(profile.id) !== -1) {
          role = "admin";
        } else {
          let sub = await getSub(userRepository, profile.id);
          if (sub.statusCode === 401) {
            await renewTokenStreamer();
            sub = await getSub(userRepository, profile.id);
          }
          if (sub.body.data.length > 0) {
            role = "sub";
          } else {
            role = "user";
          }
        }
        if (!user) {
          user = await userRepository.create({
            twitchId: profile.id,
            name: profile.login,
            role,
            accessToken,
            refreshToken
          });
        } else {
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          user.role = role;
          await userRepository.save(user);
        }
        return done(undefined, user);
      } catch (e) {
        console.log("ERROR", e);
        return done(undefined, undefined);
      }
    }
  )
);

serializeUser((user, done) => {
  done(null, user);
});

deserializeUser((user, done) => {
  done(null, user);
});
