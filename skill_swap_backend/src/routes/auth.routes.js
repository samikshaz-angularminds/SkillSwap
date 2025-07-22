import {userLogin,userSignUp,refreshAccessToken} from "../controllers/auth.controller.js"
import express from "express";
const router = express.Router();
import { envConfig } from "../config/envConfig.js";
import passport from "passport"

// Auth routes
router.post("/signup", userSignUp);
router.post("/login", userLogin);

router.post('/refresh-token',refreshAccessToken);

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