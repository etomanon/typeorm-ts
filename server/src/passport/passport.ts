import { use, serializeUser, deserializeUser } from "passport";
import { Strategy } from "passport-twitch-new";
import { getRepository } from "typeorm";

import { User } from "../entities/User";

use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:3000/auth/twitch/callback",
      scope: "user_read"
    },
    async (accessToken, refreshToken, profile, done) => {
      const userEntity = await getRepository(User);
      let user = await userEntity.findOne({ twitchId: profile.id });
      if (!user) {
        user = await userEntity.create({ twitchId: profile.id });
      }
      return done(undefined, user);
    }
  )
);

serializeUser((user, done) => {
  done(null, user);
});

deserializeUser((user, done) => {
  done(null, user);
});
