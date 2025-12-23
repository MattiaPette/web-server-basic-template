import { Class } from '../models/class.model';

const classes: Class[] = [
  {
    id: 1,
    name: 'Computer Science 101',
    roomNumber: 'A101',
    capacity: 30,
  },
  {
    id: 2,
    name: 'Mathematics Advanced',
    roomNumber: 'B205',
    capacity: 25,
  },
];

let nextId = Math.max(...classes.map(c => c.id), 0) + 1;

export const classService = {
  getAll: async (): Promise<Class[]> => {
    return classes;
  },

  getById: async (id: number): Promise<Class | undefined> => {
    return classes.find(c => c.id === id);
  },

  create: async (data: Omit<Class, 'id'>): Promise<Class> => {
    const classItem: Class = { id: nextId++, ...data };
    classes.push(classItem);
    return classItem;
  },

  update: async (
    id: number,
    updates: Partial<Omit<Class, 'id'>>,
  ): Promise<Class | null> => {
    const idx = classes.findIndex(c => c.id === id);
    if (idx === -1) {
      return null;
    }
    classes[idx] = { ...classes[idx], ...updates };
    return classes[idx];
  },

  remove: async (id: number): Promise<boolean> => {
    const idx = classes.findIndex(c => c.id === id);
    if (idx === -1) {
      return false;
    }
    classes.splice(idx, 1);
    return true;
  },
};
