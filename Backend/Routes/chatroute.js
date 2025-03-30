import express from "express";
import { generateChatResponse } from "../Controllers/chatController.js";
import protectRoute from "../Middleware/protectRoute.js";

const router = express.Router();

router.post("/generate",protectRoute,  generateChatResponse);

export default router;
