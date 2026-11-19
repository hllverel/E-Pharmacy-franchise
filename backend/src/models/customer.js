import { model, Schema } from 'mongoose';

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, default: '' },
    photo: { type: String, default: '' },
    spent: { type: Number, default: 0 },
    registerDate: { type: Date, required: true },
    purchases: [
      {
        _id: false,
        product: { type: Schema.Types.ObjectId, ref: 'products', required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

export const Customer = model('customers', customerSchema);