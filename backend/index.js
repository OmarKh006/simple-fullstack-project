import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "server under construction" });
});

app.listen(5000, () => {
  connectDB();
  console.log("server started http://localhost:5000");
});
