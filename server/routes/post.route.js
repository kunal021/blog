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
import { requireAuth } from "../middlewares/authentication.js";

const router = express.Router();

router.get("/", getAllPost);
router.get("/:id", getPost);
router.post("/", requireAuth, validatePost, createPost);
router.post("/image-upload", requireAuth, upload.single("image"), imageUpload);
router.put("/:id", requireAuth, validatePost, updatePost);
router.delete("/:id", requireAuth, deletePost);

export default router;
