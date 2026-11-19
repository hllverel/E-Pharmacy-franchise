import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import mongoose from 'mongoose';
import { initMongoConnection } from '../db/initMongoConnection.js';
import { Product } from '../models/product.js';

const seedProducts = async () => {
  await initMongoConnection();

  const raw = await readFile(
    new URL('../../data/products.json', import.meta.url),
    'utf-8',
  );
  const items = JSON.parse(raw);

  const operations = items.map((item) => {
    const doc = {
      name: item.name,
      suppliers: item.suppliers,
      price: Number(item.price),
      stock: Number(item.stock),
      category: item.category,
      photo: item.photo,
      description: `${item.category} product by ${item.suppliers}`,
    };

    return {
      updateOne: {
        filter: {
          shop: null,
          sourceProduct: null,
          name: doc.name,
          suppliers: doc.suppliers,
          price: doc.price,
        },
        update: { $set: doc },
        upsert: true,
      },
    };
  });

  const result = await Product.bulkWrite(operations);
  console.log(`Created: ${result.upsertedCount}, already existed: ${result.matchedCount}`);

  await mongoose.disconnect();
};

seedProducts();