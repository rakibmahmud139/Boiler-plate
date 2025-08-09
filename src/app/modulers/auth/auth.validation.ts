import { z } from 'zod';

const userRegistrationValidationSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'username is required' }),
    email: z.string({ required_error: 'email is required' }),
    profile: z.string().optional(),
    role: z.enum(['manager', 'salesman']).default('salesman'),
    password: z
      .string()
      .min(6, { message: 'password must be at least 6 characters' })
      .max(18, { message: 'password can not be more than 18 characters' }),
  }),
});

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'email must be provided' }),
    password: z.string({ required_error: 'password must be provided' }),
  }),
});

export const authValidation = {
  userRegistrationValidationSchema,
  userLoginValidationSchema,
};
