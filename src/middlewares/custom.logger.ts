import { LoggerService } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

export class CustomLogger implements LoggerService {
  constructor(
    @InjectPinoLogger()
    private readonly logger: PinoLogger,
  ) {}
  log(message: string, context?: string) {
    this.logger.info({ context }, message);
  }
  error(message: string, context?: string) {
    this.logger.error({ context }, message);
  }
  warn(message: string, context?: string) {
    this.logger.warn({ context }, message);
  }
  debug(message: string, context?: string) {
    this.logger.debug({ context }, message);
  }
  verbose(message: string, context?: string) {
    this.logger.trace({ context }, message);
  }
}
