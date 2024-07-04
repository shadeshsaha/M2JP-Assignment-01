import { TOrder } from "./order.interface";
import { Order } from "./order.model";

//create new Order
const createOrder = async (payload: TOrder) => {
  const result = await Order.create(payload);
  return result;
};

//get all orders
const getAllOrder = async () => {
  const result = await Order.find();
  return result;
};

//get an order based on user email
const getAnOrder = async (email: string) => {
  const result = await Order.find({
    email,
  });
  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrder,
  getAnOrder,
};
