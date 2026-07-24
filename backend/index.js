import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send({ message: "server under construction" });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`server started http://localhost:${PORT}`);
});
