import mongoose, { Schema } from 'mongoose';
import { TCart } from './cart.interface';

const productSchema = new Schema<TCart>(
  {
    productId: {
      type: String,
      ref: 'Product',
    },
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
      default: 1,
    },
    image: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
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

export const Cart = mongoose.model<TCart>('Cart', productSchema);
