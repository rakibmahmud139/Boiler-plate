import mongoose, { Schema } from 'mongoose';
import { TSale } from './sales.interface';

const saleSchema = new Schema<TSale>(
  {
    quantityOfSold: { type: Number, required: true },
    buyerName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    saleDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export const Sale = mongoose.model<TSale>('Sale', saleSchema);
