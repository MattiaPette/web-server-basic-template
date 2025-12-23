import { z } from 'zod';

/**
 * Zod schema for User creation
 * Validates: name, surname, email (required), age (optional)
 */
export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  surname: z
    .string()
    .min(1, 'Surname is required')
    .max(100, 'Surname is too long'),
  email: z.string().email('Invalid email address'),
  age: z.number().int().positive().optional(),
});

/**
 * Zod schema for User updates
 * All fields are optional for partial updates
 */
export const updateUserSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name is too long')
    .optional(),
  surname: z
    .string()
    .min(1, 'Surname is required')
    .max(100, 'Surname is too long')
    .optional(),
  email: z.string().email('Invalid email address').optional(),
  age: z.number().int().positive().optional(),
});

/**
 * Zod schema for validating user ID parameter
 */
export const userIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a valid number'),
});

/**
 * Type inference from Zod schemas
 */
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserIdParam = z.infer<typeof userIdParamSchema>;
