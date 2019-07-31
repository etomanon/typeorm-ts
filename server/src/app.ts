import { join } from "path";
import { config } from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import ExpressSession from "express-session";
import { TypeormStore } from "connect-typeorm";
import passport from "passport";

import { routes } from "./routes/routes";
import { Session } from "./entities/Session";
import "./passport/passport";
config();

// create typeorm connection
createConnection().then(async connection => {
  // create and setup express app
  const app = express();
  app.use(bodyParser.json());
  // session for Passport.js with TypeORM
  const session = await connection.getRepository(Session);
  app.use(
    ExpressSession({
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false,
        ttl: 86400
      }).connect(session),
      secret: process.env.SESSION_SECRET
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // register routes
  app.use("/api", ...routes);
  // serve react build
  app.use(express.static(join(__dirname, "/../../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "/../../client/build/index.html"));
  });

  // start express server
  app.listen(3001);
});
