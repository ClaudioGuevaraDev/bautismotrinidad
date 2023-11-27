import { Router } from "express";

import {
  deleteImage,
  getImages,
  updateImage,
  uploadImage,
} from "../controllers/images";

const router = Router();

router.get("/", getImages);
router.post("/", uploadImage);
router.delete("/:id", deleteImage);
router.put("/:id", updateImage);

export default router;
