import express from "express";
import passport from "passport";
import {
    userSignUp, 
    userLogin,
    updateUser,
    deleteUser,
    refreshAccessToken,
    getUser
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import authenticateToken from "../middlewares/autehenticateToken.middleware.js";
const router = express.Router();


// Auth routes
router.post("/signup", upload.single("avatar"), userSignUp);
router.post("/login", userLogin);

router.post('/refresh-token',refreshAccessToken);

// User routes
router.route("/:id")
.get(authenticateToken,getUser)
router.put("/:id", upload.single("avatar"), updateUser);
router.delete("/:id", deleteUser);



export default router;