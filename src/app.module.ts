import { Module } from '@nestjs/common';
import { CarController } from './controllers/car.controller';
import { CarService } from './services/car.service';
import { PrismaService } from './services/prisma.service';

@Module({
  imports: [],
  controllers: [CarController],
  providers: [CarService, PrismaService],
})
export class AppModule {}
