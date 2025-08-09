"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidation = void 0;
const zod_1 = require("zod");
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        productName: zod_1.z.string({ required_error: 'productName is required' }),
        productPrice: zod_1.z.number({ required_error: 'product price is required' }),
        productQuantity: zod_1.z.number({
            required_error: 'product quantity is required',
        }),
        image: zod_1.z.string({ required_error: 'product image is required' }),
        brand: zod_1.z.string({ required_error: 'product brand is required' }),
        modelNumber: zod_1.z.string({
            required_error: 'product model number is required',
        }),
        category: zod_1.z.string({ required_error: 'product category is required' }),
        connectivity: zod_1.z.array(zod_1.z.string({ required_error: 'product connectivity is required' })),
        powerSource: zod_1.z.string({
            required_error: 'product power source is required',
        }),
    }),
});
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        productName: zod_1.z.string().optional(),
        productPrice: zod_1.z.number().optional(),
        productQuantity: zod_1.z.number().optional(),
        image: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
        modelNumber: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        connectivity: zod_1.z.array(zod_1.z.string()).optional(),
        powerSource: zod_1.z.string().optional(),
    }),
});
exports.productValidation = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
