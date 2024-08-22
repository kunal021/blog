import express from "express";
import postRoute from "./post.route.js";

const router = express.Router();

router.use("/posts", postRoute);

export default router;
