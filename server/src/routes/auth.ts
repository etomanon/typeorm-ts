import { authenticate } from "passport";
import { Router } from "express";

export const router = Router();

router.get("/auth/twitch", authenticate("twitch"));

router.get(
  "/auth/twitch/callback",
  authenticate("twitch", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect home.
    if (req.user) {
      res.json({
        success: true,
        message: "user has successfully authenticated",
        user: req.user,
        cookies: req.cookies
      });
    }
    res.json({});
    // res.redirect("/");
  }
);

router.get("/auth/logout", (req, res) => {
  req.logout();
  res.end();
  // res.redirect("/");
});
