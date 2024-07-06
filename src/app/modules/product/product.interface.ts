/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

// variants type
export type TVariants = {
  type: string;
  value: string;
};

// inventory type
export type TInventory = {
  quantity: number;
  inStock: boolean;
};

// product type
export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariants[];
  inventory: TInventory;
  isDeleted?: boolean;
};

export interface TProductModel extends Model<TProduct> {
  isProductExists(id: string): Promise<TProduct | null>;
}
