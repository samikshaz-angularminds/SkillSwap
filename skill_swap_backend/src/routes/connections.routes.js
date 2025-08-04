import express from "express";
import {
    acceptConnectionRequest,
    cancelConnectionRequest,
    rejectConnectionRequest,
    sendConnectionRequest,
    showPendingRequest,
    showReceivedRequest,
    showAcceptedRequest
} from "../controllers/connections.controller.js";
import authenticateToken from "../middlewares/autehenticateToken.middleware.js";
const router = express.Router();

router.post("/:id/request", authenticateToken, sendConnectionRequest)
router.post("/:id/accept", authenticateToken, acceptConnectionRequest)
router.post("/:id/reject", authenticateToken, rejectConnectionRequest)
router.post("/:id/cancel", authenticateToken, cancelConnectionRequest)

router.get("/me/pending", authenticateToken, showPendingRequest)
router.get("/me/received", authenticateToken, showReceivedRequest)
router.get("/me/all", authenticateToken, showAcceptedRequest)



export default router