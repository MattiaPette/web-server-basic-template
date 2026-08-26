import { Rubrica } from '../models/rubrica.model';

const rubrica: Rubrica[] = [
  {
    id: 1,
    name: 'Mario',
    surname: 'Rossi',
    email: 'mario.rossi@example.com',
    telephone: '1234567890',
  },
  {
    id: 2,
    name: 'Luisa',
    surname: 'Bianchi',
    email: 'luisa.bianchi@example.com',
    telephone: '0987654321',
  },
  {
    id: 3,
    name: 'Giovanni',
    surname: 'Verdi',
    email: 'giovanni.verdi@example.com',
    telephone: '5555555555',
  },
];

let nextId = Math.max(...rubrica.map(c => c.id), 0) + 1;

export const rubricaService = {
  getAll: async (): Promise<Rubrica[]> => {
    return rubrica;
  },

  getById: async (id: number): Promise<Rubrica | undefined> => {
    return rubrica.find(u => u.id === id);
  },

  getByEmail: async (email: string): Promise<Rubrica | undefined> => {
    return rubrica.find(u => u.email === email);
  },

  create: async (newRubrica: Omit<Rubrica, 'id'>): Promise<Rubrica> => {
    const createdRubrica: Rubrica = { id: nextId++, ...newRubrica };

    rubrica.push(createdRubrica);

    return createdRubrica;
  },

  delete: async (id: number): Promise<boolean> => {
    const index = rubrica.findIndex(u => u.id === id);
    if (index !== -1) {
      rubrica.splice(index, 1);
      return true;
    }
    return false;
  },

  update: async (
    id: number,
    updatedRubrica: Partial<Omit<Rubrica, 'id'>>,
  ): Promise<Rubrica | undefined> => {
    const rubricaToUpdate = rubrica.find(u => u.id === id);
    if (rubricaToUpdate) {
      Object.assign(rubricaToUpdate, updatedRubrica);
      return rubricaToUpdate;
    }
    return undefined;
  },
};
