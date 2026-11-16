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