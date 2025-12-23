import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodIssue } from 'zod';

/**
 * Validation middleware factory that validates request data against a Zod schema
 * @param schema - Zod schema to validate against
 * @param property - Which part of the request to validate ('body', 'params', 'query')
 * @returns Express middleware function
 */
export const validate =
  (schema: z.ZodSchema, property: 'body' | 'params' | 'query' = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate and parse the request data
      const validated = schema.parse(req[property]);
      // Replace the request property with validated data
      req[property] = validated;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod validation errors for better readability
        const errors = error.issues.map((err: ZodIssue) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return res.status(400).json({
          message: 'Validation failed',
          errors,
        });
      }
      // Handle unexpected errors
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
