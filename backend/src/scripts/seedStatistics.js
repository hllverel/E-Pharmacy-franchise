import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import mongoose from 'mongoose';
import { initMongoConnection } from '../db/initMongoConnection.js';
import { Product } from '../models/product.js';
import { Customer } from '../models/customer.js';
import { Supplier } from '../models/supplier.js';
import { Transaction } from '../models/transaction.js';

const DAY_MS = 24 * 60 * 60 * 1000;

const readJson = async (file) =>
  JSON.parse(
    await readFile(new URL(`../../data/${file}`, import.meta.url), 'utf-8'),
  );

const pickRandomPurchases = (products) => {
  const count = 2 + Math.floor(Math.random() * 5);
  return [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map((product) => ({ product: product._id, price: product.price }));
};

const seedSuppliers = async () => {
  const items = await readJson('suppliers.json');
  await Supplier.deleteMany({});
  await Supplier.insertMany(
    items.map((item) => ({
      name: item.name,
      address: item.address,
      company: item.suppliers,
      status: item.status,
    })),
  );
  console.log(`Suppliers: ${items.length}`);
};

const seedTransactions = async () => {
  const items = await readJson('Income-Expenses.json');
  const now = new Date();
  const todayNoon = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12);

  await Transaction.deleteMany({});
  await Transaction.insertMany(
    items.map((item, index) => ({
      name: item.name,
      type: item.type,
      amount: Number(item.amount.replace(/,/g, '')),
      date: new Date(todayNoon - Math.floor(index / 6) * DAY_MS),
    })),
  );
  console.log(`Transactions: ${items.length}`);
};

const seedCustomers = async () => {
  const products = await Product.find({ shop: null, sourceProduct: null }, '_id price');
  if (products.length === 0) {
    throw new Error('Seed the product catalogue first: npm run seed:products');
  }

  const items = await readJson('customers.json');

  const operations = items.map((item) => ({
    updateOne: {
      filter: { name: item.name, phone: item.phone },
      update: {
        $set: {
          email: item.email,
          address: item.address,
          photo: (item.photo ?? item.image ?? '').replace(/\.png1$/, '.png'),
          spent: Number(item.spent.replace(/,/g, '')),
          registerDate: new Date(item.register_date),
        },
        $setOnInsert: { purchases: pickRandomPurchases(products) },
      },
      upsert: true,
    },
  }));

  const result = await Customer.bulkWrite(operations);
  console.log(`Customers: created ${result.upsertedCount}, already existed ${result.matchedCount}`);
};

const run = async () => {
  await initMongoConnection();
  await seedSuppliers();
  await seedTransactions();
  await seedCustomers();
  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});