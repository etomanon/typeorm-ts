import { authenticate } from "passport";
import { Router } from "express";

export const router = Router();

router.get("/auth/twitch", authenticate("twitch"));

router.get(
  "/auth/twitch/callback",
  authenticate("twitch", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
