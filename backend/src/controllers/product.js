import { PRODUCT_CATEGORIES } from '../constants/categories.js';
import { createProduct, getProducts } from '../services/product.js';

export const getProductsController = async (req, res) => {
  const result = await getProducts(req.shop._id, req.validatedQuery);

  res.status(200).json({
    status: 200,
    message: 'Products retrieved successfully',
    data: { ...result, categories: PRODUCT_CATEGORIES },
  });
};

export const createProductController = async (req, res) => {
  const product = await createProduct(req.shop._id, req.body, req.file);

  res.status(201).json({
    status: 201,
    message: 'Product added successfully',
    data: product,
  });
};