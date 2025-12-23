import { Request, Response } from 'express';
import { classService } from '../services/class.service';

export const createClass = async (req: Request, res: Response) => {
  try {
    // Validation is handled by middleware, req.body is already validated
    const { name, roomNumber, capacity } = req.body;
    const created = await classService.create({ name, roomNumber, capacity });
    return res.status(201).json(created);
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getClasses = async (_req: Request, res: Response) => {
  const list = await classService.getAll();
  return res.json(list);
};

export const getClassById = async (req: Request, res: Response) => {
  // Validation is handled by middleware, req.params.id is already validated
  const id = Number(req.params.id);
  const classItem = await classService.getById(id);
  if (!classItem) {
    return res.status(404).json({ message: 'Class not found' });
  }
  return res.json(classItem);
};

export const updateClass = async (req: Request, res: Response) => {
  // Validation is handled by middleware
  const id = Number(req.params.id);
  const updates = req.body;
  const updated = await classService.update(id, updates);
  if (!updated) {
    return res.status(404).json({ message: 'Class not found' });
  }
  return res.json(updated);
};

export const deleteClass = async (req: Request, res: Response) => {
  // Validation is handled by middleware
  const id = Number(req.params.id);
  const ok = await classService.remove(id);
  if (!ok) {
    return res.status(404).json({ message: 'Class not found' });
  }
  return res.status(204).send();
};
