import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    productName: z.string({ required_error: 'productName is required' }),
    productPrice: z.number({ required_error: 'product price is required' }),
    productQuantity: z.number({
      required_error: 'product quantity is required',
    }),
    image: z.string({ required_error: 'product image is required' }),
    brand: z.string({ required_error: 'product brand is required' }),
    modelNumber: z.string({
      required_error: 'product model number is required',
    }),
    category: z.string({ required_error: 'product category is required' }),

    connectivity: z.array(
      z.string({ required_error: 'product connectivity is required' }),
    ),
    powerSource: z.string({
      required_error: 'product power source is required',
    }),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    productName: z.string().optional(),
    productPrice: z.number().optional(),
    productQuantity: z.number().optional(),
    image: z.string().optional(),
    brand: z.string().optional(),
    modelNumber: z.string().optional(),
    category: z.string().optional(),
    connectivity: z.array(z.string()).optional(),
    powerSource: z.string().optional(),
  }),
});

export const productValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
