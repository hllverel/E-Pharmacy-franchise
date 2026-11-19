import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import mongoose from 'mongoose';
import { initMongoConnection } from '../db/initMongoConnection.js';
import { Product } from '../models/product.js';
import { Review } from '../models/review.js';

const DAY_MS = 24 * 60 * 60 * 1000;

const randomInt = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

const run = async () => {
  await initMongoConnection();

  const products = await Product.find({ shop: null, sourceProduct: null }, '_id');
  if (products.length === 0) {
    throw new Error('Seed the product catalogue first: npm run seed:products');
  }

  const testimonials = JSON.parse(
    await readFile(new URL('../../data/reviews.json', import.meta.url), 'utf-8'),
  );

  const reviews = products.flatMap((product) =>
    Array.from({ length: randomInt(4, 10) }, () => {
      const testimonial = testimonials[randomInt(0, testimonials.length - 1)];
      return {
        product: product._id,
        name: testimonial.name,
        text: testimonial.testimonial,
        rating: randomInt(3, 5),
        date: new Date(Date.now() - randomInt(0, 30 * DAY_MS)),
      };
    }),
  );

  await Review.deleteMany({});
  await Review.insertMany(reviews);
  console.log(`Reviews: ${reviews.length}`);

  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});