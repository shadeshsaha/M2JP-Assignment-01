/* eslint-disable @typescript-eslint/no-unused-vars */
import { TProduct } from './product.interface';
import { Product } from './product.model';

// create a new product
const createProductIntoDB = async (product: TProduct) => {
  const data = await Product.create(product);
  // removing the isDeleted flag from response
  const { isDeleted, ...restData } = data.toObject();
  console.log('isDeleted:', isDeleted);
  // sending the response without isDeleted property
  return restData;
};

// get all product from DB
const getAllProductsFromDB = async () => {
  const result = await Product.find().select('-isDeleted');
  return result;
};

// get a single product using ID from DB
const getSingleProductFromDB = async (id: string) => {
  const isExists = await Product.isProductExists(id);
  if (!isExists) {
    throw { code: 404, description: 'Product not found!' };
  }
  return isExists;
};

// get a single product using ID from DB
const updateProductData = async (id: string, payload: Partial<TProduct>) => {
  const isExists = await Product.isProductExists(id);
  if (isExists) {
    const result = await Product.findByIdAndUpdate(
      { _id: id },
      {
        $set: payload,
      },
      { new: true, fields: { _id: 0, isDeleted: 0 } },
    );
    return result;
  } else {
    throw { code: 404, description: 'Product not found!' };
  }
};

// delete a single product using ID from DB
const deleteProductFromDB = async (id: string) => {
  const isExists = await Product.isProductExists(id);
  if (isExists) {
    const result = await Product.findByIdAndUpdate(
      { _id: id },
      { $set: { isDeleted: true } },
      { new: true },
    );
    return result;
  } else {
    throw { code: 404, description: 'User not found!' };
  }
};
// delete a single product using ID from DB
const getSearchedProductsFromDB = async (searchTerm: string) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
    ],
    isDeleted: { $ne: true },
  }).select('-isDeleted');
  if (result.length === 0) {
    throw {
      code: 404,
      description: 'Products not found with this search term!',
    };
  }
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductData,
  deleteProductFromDB,
  getSearchedProductsFromDB,
};
