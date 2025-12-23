import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import { validate } from '../utils/validate';
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
} from '../models/user.schema';

const router = Router();

router.post('/users', validate(createUserSchema, 'body'), createUser);
router.get('/users', getUsers);
router.get('/users/:id', validate(userIdParamSchema, 'params'), getUserById);
router.put(
  '/users/:id',
  validate(userIdParamSchema, 'params'),
  validate(updateUserSchema, 'body'),
  updateUser,
);
router.delete('/users/:id', validate(userIdParamSchema, 'params'), deleteUser);

export default router;
