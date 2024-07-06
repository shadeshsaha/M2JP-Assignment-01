import { Schema, model } from 'mongoose';
import {
  TInventory,
  TProduct,
  TProductModel,
  TVariants,
} from './product.interface';

// variants schema
const variantSchema = new Schema<TVariants>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

// inventory schema
const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

// 2. Create a Schema corresponding to the document interface.
const productSchema = new Schema<TProduct, TProductModel>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: [variantSchema],
  inventory: inventorySchema,
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// pre hook for find operation
productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// statics method to find out provided id product exists or not
productSchema.statics.isProductExists = async function (productId: string) {
  const result = await Product.findOne(
    { _id: productId, isDeleted: { $ne: true } },
    { _id: 0, isDeleted: 0 },
  );
  return result;
};

// 3. Create a Model.
export const Product = model<TProduct, TProductModel>('Product', productSchema);
