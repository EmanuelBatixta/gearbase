import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { CustomLogger } from 'src/middlewares/custom.logger';
import { PrismaService } from 'src/services/prisma.service';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

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
  controllers: [AuthController],
  providers: [AuthService, CustomLogger, PrismaService],
  exports: [],
})
export class AuthModule {}
