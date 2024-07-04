import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post("/", OrderControllers.createOrder);
router.get("/", OrderControllers.getAnOrder); // here, if no order is retrieved by user email, then it will retrieve all the orders.

export const orderRoutes = router;
