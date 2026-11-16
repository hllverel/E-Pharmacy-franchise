import { model, Schema } from 'mongoose';
import { PRODUCT_CATEGORIES } from '../constants/categories.js';

const productSchema = new Schema(
  {
    shop: { type: Schema.Types.ObjectId, ref: 'shops', default: null },
    sourceProduct: { type: Schema.Types.ObjectId, ref: 'products', default: null },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: '' },
    category: { type: String, enum: PRODUCT_CATEGORIES, default: 'Medicine' },
    photo: { type: String, default: null },
    stock: { type: Number, default: 0 },
    suppliers: { type: String, default: '' },
  },
  { timestamps: true, versionKey: false },
);

export const Product = model('products', productSchema);