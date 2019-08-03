import { authenticate } from "passport";
import { Router } from "express";

import * as auth from "../controllers/auth";

export const router = Router();

router.get("/auth/twitch", authenticate("twitch"));

router.get(
  "/auth/twitch/callback",
  authenticate("twitch", { failureRedirect: "/" }),
  auth.authGetCallback
);

router.get("/auth/logout", auth.authGetLogout);
