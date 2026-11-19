import { PRODUCT_CATEGORIES } from '../constants/categories.js';
import { createProduct, getProducts, getProductById, addToShop, updateProduct, deleteProduct } from '../services/product.js';

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

export const getProductByIdController = async (req, res) => {
  const product = await getProductById(req.params.productId);

  res.status(200).json({
    status: 200,
    message: 'Product retrieved successfully',
    data: product,
  });
};

export const addToShopController = async (req, res) => {
  const product = await addToShop(req.shop._id, req.params.productId);

  res.status(201).json({
    status: 201,
    message: 'Product added to your shop',
    data: product,
  });
};

export const updateProductController = async (req, res) => {
  const product = await updateProduct(
    req.shop._id,
    req.params.productId,
    req.body,
    req.file,
  );

  res.status(200).json({
    status: 200,
    message: 'Product updated successfully',
    data: product,
  });
};

export const deleteProductController = async (req, res) => {
  await deleteProduct(req.shop._id, req.params.productId);

  res.status(200).json({
    status: 200,
    message: 'Product deleted successfully',
  });
};