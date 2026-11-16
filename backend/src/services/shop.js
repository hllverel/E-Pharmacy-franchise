import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { Shop } from '../models/shop.js';
import { uploadImage } from '../utils/cloudinary.js';

export const createShop = async (user, payload, file) => {
  const { password, ...shopData } = payload;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Password is wrong');
  }

  const existingShop = await Shop.findOne({ owner: user._id });
  if (existingShop) {
    throw createHttpError(409, 'You already have a shop');
  }

  const logo = file ? await uploadImage(file.buffer, 'shops') : null;

  return Shop.create({ ...shopData, owner: user._id, logo });
};

export const getShop = async (userId, shopId) => {
  const shop = await Shop.findOne({ _id: shopId, owner: userId });
  if (!shop) {
    throw createHttpError(404, 'Shop not found');
  }
  return shop;
};

export const updateShop = async (userId, shopId, payload) => {
  const shop = await Shop.findOneAndUpdate(
    { _id: shopId, owner: userId },
    payload,
    { new: true, runValidators: true },
  );
  if (!shop) {
    throw createHttpError(404, 'Shop not found');
  }
  return shop;
};

export const getShopByOwner = (userId) => Shop.findOne({ owner: userId });