/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import orderValidationSchema from './order.validation';

// create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const validateOrder = await orderValidationSchema.parse(order);
    const result = await OrderServices.createOrderIntoDB(validateOrder);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Insufficient quantity available in inventory',
    });
  }
};

// get orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    if (email) {
      const result = await OrderServices.getOrdersByEmailFromDB(
        email as string,
      );
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } else {
      const result = await OrderServices.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Orders not found!',
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
