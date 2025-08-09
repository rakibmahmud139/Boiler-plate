import { z } from 'zod';

const salesValidationSchema = z.object({
  body: z.object({
    quantityOfSold: z
      .number({ required_error: 'quantity is required' })
      .positive('Quantity must be a positive number')
      .int('Quantity must be an integer'),
    buyerName: z
      .string({ required_error: 'buyer name is required' })
      .min(2, 'Buyer name must be at least 2 characters')
      .max(50, 'Buyer name must not exceed 50 characters'),
    saleDate: z.date().optional(),
  }),
});

export const salesValidation = { salesValidationSchema };
