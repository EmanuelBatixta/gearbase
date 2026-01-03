import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { CarController } from './controllers/car.controller';
import { CarService } from './services/car.service';
import { CustomLogger } from 'src/middlewares/custom.logger';
import { PrismaService } from 'src/services/prisma.service';
import { ApiKeyService } from 'src/token/service/token.service';
import { ApiKeyModule } from 'src/token/token.module';

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
    ApiKeyModule,
  ],
  controllers: [CarController],
  providers: [CarService, CustomLogger, PrismaService, ApiKeyService],
  exports: [],
})
export class CarModule {}
