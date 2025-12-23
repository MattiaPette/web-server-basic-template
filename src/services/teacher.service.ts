import { Teacher } from '../models/teacher.model';

const teachers: Teacher[] = [
  {
    id: 1,
    name: 'Anna',
    surname: 'Verdi',
    email: 'anna.verdi@example.com',
    subject: 'Mathematics',
    yearsOfExperience: 10,
  },
  {
    id: 2,
    name: 'Marco',
    surname: 'Neri',
    email: 'marco.neri@example.com',
    subject: 'Science',
    yearsOfExperience: 5,
  },
];

let nextId = Math.max(...teachers.map(t => t.id), 0) + 1;

export const teacherService = {
  getAll: async (): Promise<Teacher[]> => {
    return teachers;
  },

  getById: async (id: number): Promise<Teacher | undefined> => {
    return teachers.find(t => t.id === id);
  },

  create: async (data: Omit<Teacher, 'id'>): Promise<Teacher> => {
    const teacher: Teacher = { id: nextId++, ...data };
    teachers.push(teacher);
    return teacher;
  },

  update: async (
    id: number,
    updates: Partial<Omit<Teacher, 'id'>>,
  ): Promise<Teacher | null> => {
    const idx = teachers.findIndex(t => t.id === id);
    if (idx === -1) {
      return null;
    }
    teachers[idx] = { ...teachers[idx], ...updates };
    return teachers[idx];
  },

  remove: async (id: number): Promise<boolean> => {
    const idx = teachers.findIndex(t => t.id === id);
    if (idx === -1) {
      return false;
    }
    teachers.splice(idx, 1);
    return true;
  },
};
