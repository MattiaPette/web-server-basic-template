import { Router } from 'express';
import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from '../controllers/teacher.controller';
import { validate } from '../utils/validate';
import {
  createTeacherSchema,
  updateTeacherSchema,
  teacherIdParamSchema,
} from '../models/teacher.schema';

const router = Router();

router.post('/teachers', validate(createTeacherSchema, 'body'), createTeacher);
router.get('/teachers', getTeachers);
router.get(
  '/teachers/:id',
  validate(teacherIdParamSchema, 'params'),
  getTeacherById,
);
router.put(
  '/teachers/:id',
  validate(teacherIdParamSchema, 'params'),
  validate(updateTeacherSchema, 'body'),
  updateTeacher,
);
router.delete(
  '/teachers/:id',
  validate(teacherIdParamSchema, 'params'),
  deleteTeacher,
);

export default router;
