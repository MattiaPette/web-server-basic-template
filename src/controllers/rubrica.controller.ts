import { Request, Response } from 'express';
import { rubricaService } from '../services/rubrica.service';

export const getRubrica = async (_req: Request, res: Response) => {
  const list = await rubricaService.getAll();
  return res.json(list);
};

export const getRubricaById = async (req: Request, res: Response) => {
  // Validation is handled by middleware, req.params.id is already validated
  const id = Number(req.params.id);
  const rubrica = await rubricaService.getById(id);
  if (!rubrica) {
    return res.status(404).json({ message: 'Rubrica not found' });
  }
  return res.json(rubrica);
};

export const searchRubrica = async (req: Request, res: Response) => {
  const { email, prefisso } = req.query;

  console.log(prefisso);

  if (email) {
    const rubrica = await rubricaService.getByEmail(email.toString());
    //handle 404
    return res.json(rubrica);
  }

  return res.json({});
};

export const createRubrica = async (req: Request, res: Response) => {
  const { name, surname, email, telephone } = req.body;

  const newRubrica = await rubricaService.create({
    name,
    surname,
    email,
    telephone,
  });

  return res.status(201).json(newRubrica);
};

export const deleteRubrica = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = await rubricaService.delete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Rubrica not found' });
  }
  return res.status(204).send();
};

export const updateRubrica = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, surname, email, telephone } = req.body;

  const updatedRubrica = await rubricaService.update(id, {
    name,
    surname,
    email,
    telephone,
  });

  if (!updatedRubrica) {
    return res.status(404).json({ message: 'Rubrica not found' });
  }

  return res.json(updatedRubrica);
};
