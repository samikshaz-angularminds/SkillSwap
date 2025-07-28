import express from "express";
import {
    updateUser,
    deleteUser,
    getUser,
    getAllUsers
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import authenticateToken from "../middlewares/autehenticateToken.middleware.js";
const router = express.Router();

// User routes
router.route("/:id")
.get(authenticateToken,getUser)
router.put("/:id", upload.single("avatar"), updateUser);
router.delete("/:id", deleteUser);

router.get("/",authenticateToken,getAllUsers);


export default router;