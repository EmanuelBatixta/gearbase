import { Module } from '@nestjs/common';
import { CarController } from './controllers/car.controller';
import { CarService } from './services/car.service';
import { PrismaService } from './services/prisma.service';
import { ApiKeyService } from './services/key.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { LoggerModule } from 'nestjs-pino';
import { CustomLogger } from './middlewares/custom.logger';

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
  controllers: [CarController, UserController],
  providers: [
    CarService,
    PrismaService,
    ApiKeyService,
    UserService,
    CustomLogger,
  ],
  exports: [CustomLogger],
})
export class AppModule {}
