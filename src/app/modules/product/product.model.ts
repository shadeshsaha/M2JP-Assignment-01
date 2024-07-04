import { Schema, model } from "mongoose";
import { TProduct, TVariants } from "./product.interface";

const variantsSchema = new Schema<TVariants>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  tags: {
    type: [String],
    required: [true, "tags is required"],
  },
  variants: {
    type: [variantsSchema],
  },
  inventory: {
    quantity: {
      type: Number,
      default: 1,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
});

export const Product = model<TProduct>("Product", productSchema);
