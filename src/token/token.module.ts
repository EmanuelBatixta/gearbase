import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { CustomLogger } from 'src/middlewares/custom.logger';
import { PrismaService } from 'src/services/prisma.service';
import { ApiKeyController } from './controllers/token.controller';
import { ApiKeyService } from './service/token.service';

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
  controllers: [ApiKeyController],
  providers: [ApiKeyService, CustomLogger, PrismaService],
  exports: [],
})
export class ApiKeyModule {}
