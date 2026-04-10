import {Router} from "express";
import userRoutes from "./user/index.js"
import fileRoutes from "./file/index.js";

const router = Router();

router.use("/auth", userRoutes);
router.use("/files", fileRoutes);


export default router;