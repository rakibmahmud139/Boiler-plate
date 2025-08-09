"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const userRegistrationValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string({ required_error: 'username is required' }),
        email: zod_1.z.string({ required_error: 'email is required' }),
        profile: zod_1.z.string().optional(),
        role: zod_1.z.enum(['manager', 'salesman']).default('salesman'),
        password: zod_1.z
            .string()
            .min(6, { message: 'password must be at least 6 characters' })
            .max(18, { message: 'password can not be more than 18 characters' }),
    }),
});
const userLoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'email must be provided' }),
        password: zod_1.z.string({ required_error: 'password must be provided' }),
    }),
});
exports.authValidation = {
    userRegistrationValidationSchema,
    userLoginValidationSchema,
};
