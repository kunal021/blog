import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
// import http from "http";
// import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import rootRouter from "./routes/root.router.js";

const app = express();
// const server = http.createServer(app);
// const io = new Server(server);
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

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   // Add any additional socket event handlers here
// });

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
