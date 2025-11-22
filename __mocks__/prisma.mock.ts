import { PrismaClient } from 'generated/prisma/client';

export const prismaMock = {
  cars: {
    findAll: jest.fn().mockResolvedValue({
      id: 1,
      make: 'Honda',
      model: 'Civic',
      year: 2020,
      hp: 158,
      city_mpg: 30,
      hwy_mpg: 38,
    }),
    findByMake: jest.fn().mockResolvedValue({
      id: 1,
      make: 'Honda',
      model: 'Civic',
      year: 2020,
      hp: 158,
      city_mpg: 30,
      hwy_mpg: 38,
    }),
    createCar: jest.fn().mockResolvedValue({
      id: 1,
      make: 'Honda',
      model: 'Civic',
      year: 2020,
      hp: 158,
      city_mpg: 30,
      hwy_mpg: 38,
    }),
    UpdateCar: jest.fn().mockResolvedValue({
      id: 1,
      make: 'Toyota',
      model: 'Corolla',
      year: 2018,
      hp: 200,
      city_mpg: 44,
      hwy_mpg: 47,
    }),
    deleteCar: jest.fn().mockResolvedValue({
      id: 1,
      make: 'Honda',
      model: 'Civic',
      year: 2020,
      hp: 158,
      city: 30,
      hwy: 38,
    }),
  },
} as unknown as PrismaClient;
