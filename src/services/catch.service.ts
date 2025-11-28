import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from 'generated/prisma/client';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal Server Error';

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = 400;
      message = `[Prisma error ${exception.code}]: ${exception.meta?.modelName} model ${exception.meta?.operation} method failed `;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }
    

    this.logger.error(
      `Status: ${status} | Path: ${request.url} | Message: ${message}`,
      exception.stack,
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
