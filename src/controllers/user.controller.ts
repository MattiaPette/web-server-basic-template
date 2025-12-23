import { Request, Response } from 'express';
import { userService } from '../services/user.service';

export const createUser = async (req: Request, res: Response) => {
  try {
    // Validation is handled by middleware, req.body is already validated
    const { name, surname, email, age } = req.body;
    const created = await userService.create({ name, surname, email, age });
    return res.status(201).json(created);
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  const list = await userService.getAll();
  return res.json(list);
};

export const getUserById = async (req: Request, res: Response) => {
  // Validation is handled by middleware, req.params.id is already validated
  const id = Number(req.params.id);
  const user = await userService.getById(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  // Validation is handled by middleware
  const id = Number(req.params.id);
  const updates = req.body;
  const updated = await userService.update(id, updates);
  if (!updated) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.json(updated);
};

export const deleteUser = async (req: Request, res: Response) => {
  // Validation is handled by middleware
  const id = Number(req.params.id);
  const ok = await userService.remove(id);
  if (!ok) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(204).send();
};
