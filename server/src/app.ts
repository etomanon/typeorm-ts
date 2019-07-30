import * as express from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import * as ExpressSession from "express-session";
import { TypeormStore } from "connect-typeorm";

import { routes } from "./routes/routes";
import { Session } from "./entities/Session";
import "./passport/passport";
require("dotenv").config();

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

  // register routes
  app.use("/api", ...routes);

  // start express server
  app.listen(3000);
});
