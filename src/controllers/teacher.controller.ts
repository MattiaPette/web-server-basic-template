import { Request, Response } from 'express';
import { teacherService } from '../services/teacher.service';

export const createTeacher = async (req: Request, res: Response) => {
  try {
    // Validation is handled by middleware, req.body is already validated
    const { name, surname, email, subject, yearsOfExperience } = req.body;
    const created = await teacherService.create({
      name,
      surname,
      email,
      subject,
      yearsOfExperience,
    });
    return res.status(201).json(created);
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTeachers = async (_req: Request, res: Response) => {
  const list = await teacherService.getAll();
  return res.json(list);
};

export const getTeacherById = async (req: Request, res: Response) => {
  // Validation is handled by middleware, req.params.id is already validated
  const id = Number(req.params.id);
  const teacher = await teacherService.getById(id);
  if (!teacher) {
    return res.status(404).json({ message: 'Teacher not found' });
  }
  return res.json(teacher);
};

export const updateTeacher = async (req: Request, res: Response) => {
  // Validation is handled by middleware
  const id = Number(req.params.id);
  const updates = req.body;
  const updated = await teacherService.update(id, updates);
  if (!updated) {
    return res.status(404).json({ message: 'Teacher not found' });
  }
  return res.json(updated);
};

export const deleteTeacher = async (req: Request, res: Response) => {
  // Validation is handled by middleware
  const id = Number(req.params.id);
  const ok = await teacherService.remove(id);
  if (!ok) {
    return res.status(404).json({ message: 'Teacher not found' });
  }
  return res.status(204).send();
};
