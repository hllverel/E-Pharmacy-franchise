import createHttpError from 'http-errors';
import { Shop } from '../models/shop.js';

export const checkShopOwner = async (req, res, next) => {
  const shop = await Shop.findOne({
    _id: req.params.shopId,
    owner: req.user._id,
  });
  if (!shop) {
    return next(createHttpError(404, 'Shop not found'));
  }
  req.shop = shop;
  next();
};