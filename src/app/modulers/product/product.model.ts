import mongoose, { Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
    },
    modelNumber: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    connectivity: {
      type: [String],
      required: true,
    },
    powerSource: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model<TProduct>('Product', productSchema);
