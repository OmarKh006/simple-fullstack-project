import express from "express";
import {
  createNewProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from "../controllers/product.controller.js";

const productRoutes = express.Router();

productRoutes.get("/", getAllProducts);

productRoutes.post("/", createNewProduct);

productRoutes.put("/:id", editProduct);

productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
