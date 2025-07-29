import express from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";

const router = express.Router();

const defaultRoutes = [
    {
        path: "/auth",
        route: authRoutes
    },
    {
        path: "/user",
        route: userRoutes
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
})

export default router;