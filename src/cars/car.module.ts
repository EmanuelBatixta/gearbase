import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { CarController } from './controllers/car.controller';
import { CarService } from './services/car.service';
import { CustomLogger } from 'src/middlewares/custom.logger';
import { PrismaService } from 'src/services/prisma.service';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV == 'development' ? 'debug' : 'error',
        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'SYS:standard',
                  ignore: 'pid,hostname',
                },
              }
            : undefined,
      },
    }),
  ],
  controllers: [CarController],
  providers: [CarService, CustomLogger, PrismaService],
  exports: [],
})
export class CarModule {}
