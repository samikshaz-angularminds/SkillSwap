import express from "express";
import passport from "passport";
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
    failureRedirect: "http://localhost:3000/signup", // Redirect here if auth fails
    successRedirect: "http://localhost:3000/user/home", // Redirect here if auth succeeds (or handle in callback)
    session: true, // Set to false if you're not using sessions
  })
);

export default router;