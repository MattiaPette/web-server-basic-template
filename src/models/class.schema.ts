import { z } from 'zod';

/**
 * Zod schema for Class creation
 * Validates: name, roomNumber, capacity (all required)
 */
export const createClassSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  roomNumber: z
    .string()
    .min(1, 'Room number is required')
    .max(20, 'Room number is too long'),
  capacity: z
    .number()
    .int()
    .positive('Capacity must be a positive number')
    .max(1000, 'Capacity is too large'),
});

/**
 * Zod schema for Class updates
 * All fields are optional for partial updates
 */
export const updateClassSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name is too long')
    .optional(),
  roomNumber: z
    .string()
    .min(1, 'Room number is required')
    .max(20, 'Room number is too long')
    .optional(),
  capacity: z
    .number()
    .int()
    .positive('Capacity must be a positive number')
    .max(1000, 'Capacity is too large')
    .optional(),
});

/**
 * Zod schema for validating class ID parameter
 */
export const classIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a valid number'),
});

/**
 * Type inference from Zod schemas
 */
export type CreateClassInput = z.infer<typeof createClassSchema>;
export type UpdateClassInput = z.infer<typeof updateClassSchema>;
export type ClassIdParam = z.infer<typeof classIdParamSchema>;
