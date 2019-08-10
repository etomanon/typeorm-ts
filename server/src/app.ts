import { join } from "path";
import express from "express";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import ExpressSession from "express-session";
import { TypeormStore } from "connect-typeorm";
import passport from "passport";
import serveStatic from "serve-static";
import serveIndex from "serve-index";
import contentDisposition from "content-disposition";
import compression from "compression";
import helmet from "helmet";

import { admin } from "./passport/admin";
import { routes } from "./routes/routes";
import { Session } from "./entities/Session";
import "./passport/passport";

// create typeorm connection
createConnection().then(async connection => {
  // create and setup express app
  const app = express();
  app.use(bodyParser.json());
  // gzip
  app.use(compression());
  // proper headers
  app.use(helmet());
  // session for Passport.js with TypeORM
  const session = await connection.getRepository(Session);
  app.use(
    ExpressSession({
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({
        cleanupLimit: 1,
        ttl: 86400
      }).connect(session),
      secret: process.env.SESSION_SECRET
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // register routes
  app.use("/api", ...routes);
  // serve files and enable download
  const setHeaders = (res, path) => {
    res.setHeader("Content-Disposition", contentDisposition(path));
  };
  app.use(
    "/file/",
    admin,
    serveStatic(join(__dirname, "/../files"), {
      setHeaders
    })
  );
  app.use(
    "/file/",
    serveIndex(join(__dirname, "/../files"), { view: "details", icons: true })
  );
  // serve react build
  app.use(express.static(join(__dirname, "/../../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "/../../client/build/index.html"));
  });

  // start express server
  app.listen(3001);
});
