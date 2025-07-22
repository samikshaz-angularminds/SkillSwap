import express from "express";
import passport from "passport";
import { envConfig } from "../config/envConfig.js";
const router = express.Router();

// Route to initiate Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // What data you want from Google
  })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: envConfig.google_failure_redirect_uri, // Redirect here if auth fails
    successRedirect: envConfig.google_success_redirect_uri, // Redirect here if auth succeeds (or handle in callback)
    session: true, // Set to false if you're not using sessions
  })
);

export default router;