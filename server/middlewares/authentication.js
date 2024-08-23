import { configDotenv } from "dotenv";
configDotenv();
import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
