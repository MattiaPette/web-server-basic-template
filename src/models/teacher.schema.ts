import { z } from 'zod';

/**
 * Zod schema for Teacher creation
 * Validates: name, surname, email, subject (required), yearsOfExperience (optional)
 */
export const createTeacherSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
  surname: z
    .string()
    .min(1, 'Surname is required')
    .max(50, 'Surname is too long'),
  email: z.string().email('Invalid email address'),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(100, 'Subject is too long'),
  yearsOfExperience: z.number().int().nonnegative().optional(),
});

/**
 * Zod schema for Teacher updates
 * All fields are optional for partial updates
 */
export const updateTeacherSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name is too long')
    .optional(),
  surname: z
    .string()
    .min(1, 'Surname is required')
    .max(50, 'Surname is too long')
    .optional(),
  email: z.string().email('Invalid email address').optional(),
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(100, 'Subject is too long')
    .optional(),
  yearsOfExperience: z.number().int().nonnegative().optional(),
});

/**
 * Zod schema for validating teacher ID parameter
 */
export const teacherIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a valid number'),
});

/**
 * Type inference from Zod schemas
 */
export type CreateTeacherInput = z.infer<typeof createTeacherSchema>;
export type UpdateTeacherInput = z.infer<typeof updateTeacherSchema>;
export type TeacherIdParam = z.infer<typeof teacherIdParamSchema>;
