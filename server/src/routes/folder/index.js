import { Router } from "express";
import {
  createFolder,
  deleteFolder,
  readFolder,
  updateFolder,
} from "../../controllers/folders/index.js";

const router = Router();

router.post("/create", createFolder);
router.get("/read/:folderName", readFolder);
router.put("/update", updateFolder);
router.delete("/delete/:folderName", deleteFolder);

export default router;
