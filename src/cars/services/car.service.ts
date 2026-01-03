import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async findByQueries(make?: string, model?: string, year?: number) {
    // make = make.trim().toUpperCase();
    const result = await this.prisma.car.findMany({
      where: {
        ...(make && {
          make: {
            contains: make,
            mode: 'insensitive',
          },
        }),
        ...(model && {
          model: {
            contains: model,
            mode: 'insensitive',
          },
        }),
        ...(year && {
          year,
        }),
      },
    });
    return { data: result };
  }

  async createCar(data: {
    make: string;
    model: string;
    year: number;
    hp: number;
    city_mpg: number;
    hwy_mpg: number;
    category: 'SEDAN' | 'SUV' | 'TRUCK' | 'COUPE' | 'HATCHBACK' | 'VAN';
    transmission: 'MANUAL' | 'AUTOMATIC';
    fuel_type:
      | 'GASOLINE'
      | 'DIESEL'
      | 'ELECTRIC'
      | 'HYBRID'
      | 'ETHANOL'
      | 'FLEX';
    torque: number;
    acceleration?: number | null;
  }) {
    return await this.prisma.car.create({
      data: data,
    });
  }

  async deleteCar(id: number) {
    return await this.prisma.car.delete({
      where: {
        id: id,
      },
    });
  }

  async updateCar(
    id: number,
    data: Partial<{
      make: string;
      model: string;
      year: number;
      hp: number;
      city_mpg: number;
      hwy_mpg: number;
      category: 'SEDAN' | 'SUV' | 'TRUCK' | 'COUPE' | 'HATCHBACK' | 'VAN';
      transmission: 'MANUAL' | 'AUTOMATIC';
      fuel_type:
        | 'GASOLINE'
        | 'DIESEL'
        | 'ELECTRIC'
        | 'HYBRID'
        | 'ETHANOL'
        | 'FLEX';
      torque: number;
      acceleration?: number | null;
    }>,
  ) {
    return await this.prisma.car.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  mpgTokml(kml: number): number {
    return kml * 2.352;
  }
}
