import { model, Schema } from 'mongoose';

const transactionSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['Income', 'Expense', 'Error'], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Transaction = model('transactions', transactionSchema);