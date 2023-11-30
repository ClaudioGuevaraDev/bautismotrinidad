import { Router } from "express";

import {
  deleteImage,
  getImages,
  updateImage,
  uploadImage,
} from "../controllers/images";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/", getImages);
router.post("/", verifyToken, uploadImage);
router.delete("/:id", verifyToken, deleteImage);
router.put("/:id", verifyToken, updateImage);

export default router;
