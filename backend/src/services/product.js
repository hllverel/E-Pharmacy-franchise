import createHttpError from 'http-errors';
import { Product } from '../models/product.js';
import { uploadImage } from '../utils/cloudinary.js';

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const getProducts = async (shopId, { scope, category, search, page, limit }) => {
  const filter = {};

  if (scope === 'all') {
    const alreadyAdded = await Product.distinct('sourceProduct', {
      shop: shopId,
      sourceProduct: { $ne: null },
    });
    filter.shop = { $ne: shopId };
    filter.sourceProduct = null;
    filter._id = { $nin: alreadyAdded };
  } else {
    filter.shop = shopId;
  }

  if (category) filter.category = category;
  if (search) filter.name = { $regex: escapeRegex(search), $options: 'i' };

  const skip = (page - 1) * limit;

  const [products, totalItems] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  return { products, totalItems, totalPages: Math.ceil(totalItems / limit), page };
};

export const createProduct = async (shopId, payload, file) => {
  const photo = file ? await uploadImage(file.buffer, 'products') : null;
  return Product.create({ ...payload, shop: shopId, photo });
};

export const getProductById = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
  return product;
};

export const addToShop = async (shopId, productId) => {
  const source = await Product.findOne({
    _id: productId,
    sourceProduct: null,
    shop: { $ne: shopId },
  });
  if (!source) {
    throw createHttpError(404, 'Product not found');
  }

  const existingCopy = await Product.findOne({
    shop: shopId,
    sourceProduct: source._id,
  });
  if (existingCopy) {
    throw createHttpError(409, 'Product is already in your shop');
  }

  const { name, price, description, category, photo, stock, suppliers } = source;

  return Product.create({
    name,
    price,
    description,
    category,
    photo,
    stock,
    suppliers,
    shop: shopId,
    sourceProduct: source._id,
  });
};

export const updateProduct = async (shopId, productId, payload, file) => {
  if (Object.keys(payload).length === 0 && !file) {
    throw createHttpError(400, 'No data to update');
  }

  const product = await Product.findOne({ _id: productId, shop: shopId });
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  const update = { ...payload };
  if (file) {
    update.photo = await uploadImage(file.buffer, 'products');
  }

  product.set(update);
  return product.save();
};

export const deleteProduct = async (shopId, productId) => {
  const product = await Product.findOneAndDelete({ _id: productId, shop: shopId });
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }
};