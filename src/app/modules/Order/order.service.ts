/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

// create a new product
const createOrderIntoDB = async (order: TOrder) => {
  const product = await Product.findById(order.productId);

  // checking the product exist or not
  if (!product) {
    throw new Error('Product not found');
  }

  //checking if product quantity is less than order quantity or product quantity 0
  if (
    product?.inventory.quantity < order.quantity ||
    product?.inventory.quantity === 0
  ) {
    throw new Error('Insufficient quantity available in inventory');
  }

  // making the update object
  const update = {
    $inc: { 'inventory.quantity': -order.quantity },
    $set: {
      'inventory.inStock': product.inventory.quantity - order.quantity !== 0,
    },
  };
  // updating the product
  await Product.findByIdAndUpdate(order.productId, update, { new: true });

  // creating the order
  const newOrder = await Order.create(order);
  return newOrder;
};

// get all orders from DB
const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

// get a specific email's orders
const getOrdersByEmailFromDB = async (email: string) => {
  const result = await Order.find({ email });
  if (result.length === 0) {
    throw new Error('Order not found');
  }
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB,
};
