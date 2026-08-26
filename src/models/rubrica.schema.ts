import { z } from 'zod';

export const createRubricaBodySchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
  surname: z
    .string()
    .min(1, 'Surname is required')
    .max(50, 'Surname is too long'),
  email: z.email('Invalid email address'),
  telephone: z.string().length(10, 'Telephone must be exactly 10 digits'),
});

export const updateRubricaBodySchema = z.object({
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
  email: z.email('Invalid email address').optional(),
  telephone: z
    .string()
    .length(10, 'Telephone must be exactly 10 digits')
    .optional(),
});

/**
 * Zod schema for validating user ID parameter
 */
export const rubricaIdParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a valid number'),
});

/**
 * Type inference from Zod schemas
 */
export type RubricaIdParam = z.infer<typeof rubricaIdParamSchema>;
export type CreateRubricaBody = z.infer<typeof createRubricaBodySchema>;
export type UpdateRubricaBody = z.infer<typeof updateRubricaBodySchema>;
