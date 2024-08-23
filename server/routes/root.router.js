import express from "express";
import postRoute from "./post.route.js";
import authRoute from "./auth.route.js";

const router = express.Router();

router.use("/posts", postRoute);
router.use("/auth", authRoute);

export default router;
