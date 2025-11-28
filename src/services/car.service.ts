import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.car.findMany();
  }

  async findByModel(model: string) {
    model = model.trim().toUpperCase();
    return await this.prisma.car.findMany({
      where: {
        model: model,
      },
    });
  }

  async findByMake(make: string) {
    make = make.trim().toUpperCase();
    return await this.prisma.car.findMany({
      where: {
        make: make,
      },
    });
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
