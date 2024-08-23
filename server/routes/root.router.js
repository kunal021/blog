import express from "express";
import postRoute from "./post.route.js";
import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";

const router = express.Router();

router.use("/posts", postRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);

export default router;
