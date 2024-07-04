import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

router.post("/", ProductControllers.createProduct);
router.get("/", ProductControllers.searchAProduct); // here, if no product is retrieved by name, category or description, then it will retrieve all the products.
router.get("/:productId", ProductControllers.getSpecificProduct);
router.put("/:productId", ProductControllers.getUpdatedProduct);
router.delete("/:productId", ProductControllers.deletedProduct);

export const ProductRoutes = router;
