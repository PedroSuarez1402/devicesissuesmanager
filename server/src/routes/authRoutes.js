import { Router } from "express";
import { getMe, loginUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();
router.post('/login', loginUser);
router.get('/me', authMiddleware(), getMe);

export default router;