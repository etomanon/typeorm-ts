import { authenticate } from "passport";
import { Router } from "express";

export const router = Router();

router.get("/auth/twitch", authenticate("twitch"));

router.get(
  "/auth/twitch/callback",
  authenticate("twitch", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication
    if (req.user) {
      return res.redirect("/?logged=true");
    }
    res.redirect("/auth/twitch");
  }
);

router.get("/auth/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
