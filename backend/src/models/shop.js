import { model, Schema } from 'mongoose';

const shopSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    hasOwnDelivery: { type: Boolean, required: true },
    logo: { type: String, default: null },
  },
  { timestamps: true, versionKey: false },
);

export const Shop = model('shops', shopSchema);