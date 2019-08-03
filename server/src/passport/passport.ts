import { use, serializeUser, deserializeUser } from "passport";
import { Strategy } from "passport-twitch-new";
import { getRepository } from "typeorm";
import { config } from "dotenv";

import { User } from "../entities/User";
import { got } from "../got/got";
config();

const admins = process.env.ADMINS.split(",");

use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3001/api/auth/twitch/callback",
      scope: "channel:read:subscriptions"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userRepository = await getRepository(User);
        let user = await userRepository.findOne({ twitchId: profile.id });
        const role = admins.indexOf(profile.id) !== -1 ? "admin" : "user";
        const sub = await got.get(
          `subscriptions?broadcaster_id=${encodeURIComponent(profile.id)}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        );
        console.log("SUB PASS body", sub.body);
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
