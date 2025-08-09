"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesValidation = void 0;
const zod_1 = require("zod");
const salesValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        quantityOfSold: zod_1.z
            .number({ required_error: 'quantity is required' })
            .positive('Quantity must be a positive number')
            .int('Quantity must be an integer'),
        buyerName: zod_1.z
            .string({ required_error: 'buyer name is required' })
            .min(2, 'Buyer name must be at least 2 characters')
            .max(50, 'Buyer name must not exceed 50 characters'),
        saleDate: zod_1.z.date().optional(),
    }),
});
exports.salesValidation = { salesValidationSchema };
