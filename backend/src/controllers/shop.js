import { createShop, getShop, updateShop } from '../services/shop.js';

export const createShopController = async (req, res) => {
  const shop = await createShop(req.user, req.body, req.file);

  res.status(201).json({
    status: 201,
    message: 'Shop created successfully',
    data: shop,
  });
};

export const getShopController = async (req, res) => {
  const shop = await getShop(req.user._id, req.params.shopId);

  res.status(200).json({
    status: 200,
    message: 'Shop retrieved successfully',
    data: shop,
  });
};

export const updateShopController = async (req, res) => {
  const shop = await updateShop(req.user._id, req.params.shopId, req.body);

  res.status(200).json({
    status: 200,
    message: 'Shop updated successfully',
    data: shop,
  });
};