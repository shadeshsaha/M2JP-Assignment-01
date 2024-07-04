/* eslint-disable @typescript-eslint/no-explicit-any */
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

//create new product
const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

//get all products
const getAllProduct = async () => {
  const result = await Product.find();
  return result;
};

//get a single product by id
const getSpecificProduct = async (_id: string) => {
  const result = await Product.findOne({ _id: _id });
  return result;
};

//update a single product by id
const getUpdatedProduct = async (filter: string, update: any) => {
  const result = await Product.updateOne({ _id: filter }, update);
  return result;
};

//delete a product by id
const deletedProduct = async (_id: string) => {
  const result = await Product.deleteOne({ _id: _id });
  return result;
};

//search a product based on name, category, description
const searchAProduct = async (searchTerm: string) => {
  const regex = new RegExp(searchTerm, "i");
  const result = await Product.find({
    $or: [
      { name: { $regex: regex } },
      { category: { $regex: regex } },
      { description: { $regex: regex } },
    ],
  });
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProduct,
  getSpecificProduct,
  getUpdatedProduct,
  deletedProduct,
  searchAProduct,
};
