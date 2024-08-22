import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePost,
} from "../controllers/post.controller.js";
import { imageUpload } from "../utils/imageUpload.js";
import validatePost from "../validators/post.validator.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getAllPost);
router.get("/:id", getPost);
router.post("/", validatePost, createPost);
router.post("/image-upload", upload.single("image"), imageUpload);
router.put("/:id", validatePost, updatePost);
router.delete("/:id", deletePost);

export default router;
