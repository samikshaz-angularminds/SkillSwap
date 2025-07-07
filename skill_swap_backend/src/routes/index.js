import express from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.js";

const router = express.Router();

const defaultRoutes = [
    {
        path: "/users",
        route: userRoutes
    },
    {
        path: "/auth",
        route: authRoutes
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
})

export default router;