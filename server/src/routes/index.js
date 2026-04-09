import {Router} from "express";
import userRoutes from "./user/index.js"

const router = Router();

router.use("/auth", userRoutes);

export default router;