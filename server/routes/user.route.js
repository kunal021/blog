import express from "express";
import { requireAuth } from "../middlewares/authentication.js";
import { getUserPosts } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", requireAuth, getUserPosts);

export default router;
