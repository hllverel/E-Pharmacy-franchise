import { model, Schema } from 'mongoose';

const supplierSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, default: '' },
    company: { type: String, default: '' },
    status: { type: String, default: 'Active' },
  },
  { timestamps: true, versionKey: false },
);

export const Supplier = model('suppliers', supplierSchema);