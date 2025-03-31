import express from "express";
import protectRoute from "../Middleware/protectRoute.js";
import {getUserMessages} from "../Controllers/messageController.js"
const router = express.Router();

router.get("/previous-chats/:username",protectRoute, getUserMessages);

export default router;
