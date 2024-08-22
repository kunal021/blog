import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import rootRouter from "./routes/root.router.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE_URI, { dbName: "zuai" })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api", rootRouter);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
