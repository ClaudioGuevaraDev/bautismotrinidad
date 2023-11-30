import { Router } from "express";

import { getSettings, updateSettings } from "../controllers/settings";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/", getSettings);
router.put("/:id", verifyToken, updateSettings);

export default router;
