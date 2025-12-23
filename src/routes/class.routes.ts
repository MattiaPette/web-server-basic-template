import { Router } from 'express';
import {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
} from '../controllers/class.controller';
import { validate } from '../utils/validate';
import {
  createClassSchema,
  updateClassSchema,
  classIdParamSchema,
} from '../models/class.schema';

const router = Router();

router.post('/classes', validate(createClassSchema, 'body'), createClass);
router.get('/classes', getClasses);
router.get(
  '/classes/:id',
  validate(classIdParamSchema, 'params'),
  getClassById,
);
router.put(
  '/classes/:id',
  validate(classIdParamSchema, 'params'),
  validate(updateClassSchema, 'body'),
  updateClass,
);
router.delete(
  '/classes/:id',
  validate(classIdParamSchema, 'params'),
  deleteClass,
);

export default router;
