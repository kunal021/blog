import express from "express";
import {
  validateSignin,
  validateSignup,
} from "../validators/auth.validator.js";
import { signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/signin", validateSignin, signin);

export default router;
