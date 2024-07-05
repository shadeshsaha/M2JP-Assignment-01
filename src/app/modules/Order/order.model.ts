import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

// inventory schema
const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

// Create a Model.
export const Order = model<TOrder>('Order', orderSchema);
