/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ProductServices } from "../product/product.service";
import productValidationSchema from "../product/product.validation";
import { OrderServices } from "./order.service";
import orderValidationSchema from "./order.validation";

//create order request-response handler
const createOrder = async (req: Request, res: Response) => {
  try {
    const { productId, email, price, quantity } = req.body;

    const product = await ProductServices.getSpecificProduct(productId);

    if (product === null || product === undefined) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    //If the inventory quantity reaches zero, set inStock to false. Otherwise, keep inStock as true.
    if (product.inventory.quantity <= 0) {
      product.inventory.inStock = false;
      // console.log(product, product.inventory);

      const zodParsedUpdatedProductData =
        productValidationSchema.parse(product);

      await ProductServices.getUpdatedProduct(
        productId,
        zodParsedUpdatedProductData
      );

      return res.status(409).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }
    //When creating new order,reduce the quantity of the ordered product in inventory and update the inStock property.
    product.inventory.inStock = true;
    product.inventory.quantity = product.inventory.quantity - quantity;

    const zodParsedUpdatedProductData = productValidationSchema.parse(product);
    //console.log(zodParsedUpdatedProductData);

    await ProductServices.getUpdatedProduct(
      productId,
      zodParsedUpdatedProductData
    );

    //console.log(result2);

    const orderData = { email, productId, price, quantity };
    //console.log(orderData);

    const zodParsedOrderData = orderValidationSchema.parse(orderData);

    const result = await OrderServices.createOrder(zodParsedOrderData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err: any) {
    if (err.name === "ZodError") {
      res.status(403).json({
        success: false,
        message: "Validation Error!",
        error: err.issues,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
        error: err,
      });
    }
  }
};

//get all orders request-response handler
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrder();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Order not found",
      error: err,
    });
  }
};

//get an order request-response handler
const getAnOrder = async (req: Request, res: Response) => {
  const email = req.query.email;
  if (email) {
    try {
      const result = await OrderServices.getAnOrder(email as string);

      res.status(200).json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Order not found",
        error: err,
      });
    }
  } else {
    try {
      const result = await OrderServices.getAllOrder();

      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Order not found",
        error: err,
      });
    }
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrder,
  getAnOrder,
};
