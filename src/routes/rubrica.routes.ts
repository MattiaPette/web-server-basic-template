import { Router } from 'express';
import {
  getRubrica,
  getRubricaById,
  searchRubrica,
  createRubrica,
  deleteRubrica,
  updateRubrica,
} from '../controllers/rubrica.controller';
import { validate } from '../utils/validate';
import {
  rubricaIdParamSchema,
  createRubricaBodySchema,
  updateRubricaBodySchema,
} from '../models/rubrica.schema';
const router = Router();

router.get('/rubrica', getRubrica);
router.get('/rubrica/search', searchRubrica);
router.get(
  '/rubrica/:id',
  validate(rubricaIdParamSchema, 'params'),
  getRubricaById,
);
router.post(
  '/rubrica',
  validate(createRubricaBodySchema, 'body'),
  createRubrica,
);

router.delete(
  '/rubrica/:id',
  validate(rubricaIdParamSchema, 'params'),
  deleteRubrica,
);

router.put(
  '/rubrica/:id',
  validate(rubricaIdParamSchema, 'params'),
  validate(updateRubricaBodySchema, 'body'),
  updateRubrica,
);

export default router;
