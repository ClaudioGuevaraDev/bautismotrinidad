import { Router } from "express";

import {
  createMessage,
  deleteMessage,
  getMessages,
  updateMessage,
} from "../controllers/messages";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/", getMessages);
router.post("/", verifyToken, createMessage);
router.put("/:id", verifyToken, updateMessage);
router.delete("/:id", verifyToken, deleteMessage);

export default router;
