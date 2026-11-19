import createHttpError from 'http-errors';
import { Product } from '../models/product.js';
import { Supplier } from '../models/supplier.js';
import { Customer } from '../models/customer.js';
import { Transaction } from '../models/transaction.js';

export const getStatistics = async (shop) => {
  const latestTransaction = await Transaction.findOne().sort({ date: -1 });

  const [products, suppliers, customers, recentCustomers, transactions] =
    await Promise.all([
      shop ? Product.countDocuments({ shop: shop._id }) : 0,
      Supplier.countDocuments(),
      Customer.countDocuments(),
      Customer.find({}, 'name email spent phone address registerDate')
        .sort({ registerDate: -1, _id: -1 })
        .limit(5),
      latestTransaction
        ? Transaction.find({ date: latestTransaction.date }).sort({ _id: 1 })
        : [],
    ]);

  return {
    totals: { products, suppliers, customers },
    recentCustomers,
    transactions,
  };
};

export const getClientGoods = async (clientId) => {
  const customer = await Customer.findById(clientId).populate(
    'purchases.product',
    'name description photo',
  );
  if (!customer) {
    throw createHttpError(404, 'Client not found');
  }

  return {
    client: {
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      spent: customer.spent,
    },
    goods: customer.purchases
      .filter((purchase) => purchase.product)
      .map((purchase) => ({
        productId: purchase.product._id,
        name: purchase.product.name,
        description: purchase.product.description,
        photo: purchase.product.photo,
        price: purchase.price,
      })),
  };
};