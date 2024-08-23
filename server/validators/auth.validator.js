import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const signinSchema = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const validateRequest = (schema) => (req, res, next) => {
  const validation = schema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json(validation.error.errors);
  }
  next();
};

export const validateSignup = validateRequest(signupSchema);
export const validateSignin = validateRequest(signinSchema);
