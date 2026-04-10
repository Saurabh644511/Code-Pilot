import {Router} from "express";
import userRoutes from "./user/index.js"
import fileRoutes from "./file/index.js";
import folderRoutes from "./folder/index.js"
import callHuggingFaceApi, { callGemini } from "../utils/ai.util.js"
const router = Router();

router.use("/auth", userRoutes);
router.use("/files", fileRoutes);
router.use("/folders", folderRoutes)
router.use("/ai/:chat", async(req, res) => {
    const response = await callHuggingFaceApi(
        req.params.chat,
        process.env.HUGGING_FACE_API_KEY
    );
    res.json({response})
})

router.use("/gemini/:chat", callGemini)

export default router;