import { getShopByOwner } from '../services/shop.js';
import { getStatistics, getClientGoods } from '../services/statistics.js';

export const getStatisticsController = async (req, res) => {
  const shop = await getShopByOwner(req.user._id);
  const data = await getStatistics(shop);

  res.status(200).json({
    status: 200,
    message: 'Statistics retrieved successfully',
    data,
  });
};

export const getClientGoodsController = async (req, res) => {
  const data = await getClientGoods(req.params.clientId);

  res.status(200).json({
    status: 200,
    message: 'Client goods retrieved successfully',
    data,
  });
};