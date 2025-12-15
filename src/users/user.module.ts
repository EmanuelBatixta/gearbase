import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { LoggerModule } from 'nestjs-pino';
import { CustomLogger } from '../middlewares/custom.logger';
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
  controllers: [UserController],
  providers: [UserService, CustomLogger, PrismaService],
  exports: [],
})
export class UserModule {}
