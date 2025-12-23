import { User } from '../models/user.model';

const users: User[] = [
  {
    id: 1,
    name: 'Mario',
    surname: 'Rossi',
    email: 'mario.rossi@example.com',
    age: 30,
  },
  {
    id: 2,
    name: 'Luisa',
    surname: 'Bianchi',
    email: 'luisa.bianchi@example.com',
  },
];

let nextId = Math.max(...users.map(u => u.id), 0) + 1;

export const userService = {
  getAll: async (): Promise<User[]> => {
    return users;
  },

  getById: async (id: number): Promise<User | undefined> => {
    return users.find(u => u.id === id);
  },

  create: async (data: Omit<User, 'id'>): Promise<User> => {
    const user: User = { id: nextId++, ...data };
    users.push(user);
    return user;
  },

  update: async (
    id: number,
    updates: Partial<Omit<User, 'id'>>,
  ): Promise<User | null> => {
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) {
      return null;
    }
    users[idx] = { ...users[idx], ...updates };
    return users[idx];
  },

  remove: async (id: number): Promise<boolean> => {
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) {
      return false;
    }
    users.splice(idx, 1);
    return true;
  },
};
