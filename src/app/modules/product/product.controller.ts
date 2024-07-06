/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { ProductServices } from './product.service';
import {
  productValidationSchema,
  updateProductValidationSchema,
} from './product.validation';

// create product
const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = req.body;
    const validatedProduct = productValidationSchema.parse(product);
    const result = await ProductServices.createProductIntoDB(validatedProduct);
    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// get products
const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { searchTerm } = req.query;
    if (searchTerm) {
      const result = await ProductServices.getSearchedProductsFromDB(
        searchTerm as string,
      );
      res.status(200).json({
        success: true,
        message: 'Search products retrieved successfully!',
        data: result,
      });
    } else {
      const result = await ProductServices.getAllProductsFromDB();
      res.status(200).json({
        success: true,
        message: 'Products fetched successfully!',
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

// get single product controller
const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// update product controller
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    const validatedData = updateProductValidationSchema.parse(productData);
    const result = await ProductServices.updateProductData(
      productId,
      validatedData,
    );
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// delete controller
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// const getSearchedProducts = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { searchTerm } = req.query;
//     console.log(searchTerm);
//     const result = await ProductServices.getSearchedProductsFromDB(searchTerm as string);
//     res.status(200).json({
//       success: true,
//       message: 'Search products retrieved successfully!',
//       data: result,
//     });
//   }
//   catch (error) {
//     next(error);
//   }
// };

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  // getSearchedProducts
};
