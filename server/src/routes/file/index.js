import {Router} from "express";
import { createFile, deleteFile, getFiles, readFile, updateFile } from "../../controllers/files/index.js";

const router = Router();

router.post("/create", createFile)
router.get("/read/:fileName", readFile)
router.put("/update", updateFile);
router.delete("/delete/:fileName", deleteFile)

export default router;
