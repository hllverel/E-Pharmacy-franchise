import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import mongoose from 'mongoose';
import { initMongoConnection } from '../db/initMongoConnection.js';
import { Product } from '../models/product.js';

const isImageAvailable = async (url) => {
  try {
    const response = await fetch(url);
    await response.body?.cancel();
    return (
      response.ok &&
      Boolean(response.headers.get('content-type')?.startsWith('image/'))
    );
  } catch {
    return false;
  }

};

const seedProducts = async () => {
  await initMongoConnection();

  const raw = await readFile(
    new URL('../../data/products.json', import.meta.url),
    'utf-8',
  );
  const items = JSON.parse(raw);


const availability = await Promise.all(
  items.map((item) => isImageAvailable(item.photo)),
);

const workingPhotos = [
  ...new Set(
    items.filter((_, index) => availability[index]).map((item) => item.photo),
  ),
];

console.log(
  `Replacing ${availability.filter((isOk) => !isOk).length} broken image links`,
);

const operations = items.map((item, index) => {
  const photo = availability[index]
    ? item.photo
    : (workingPhotos[index % workingPhotos.length] ?? null);

  const doc = {
    name: item.name,
    suppliers: item.suppliers,
    price: Number(item.price),
    stock: Number(item.stock),
    category: item.category,
    photo,
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