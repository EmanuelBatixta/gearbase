import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '../swagger.config';
import { GlobalExceptionFilter } from './middlewares/catch.middle';
import { CustomLogger } from './middlewares/custom.logger';
import { ValidationPipe } from '@nestjs/common';
//import cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  setupSwagger(app);
  //app.use(cookieParser());
  app.enableCors({
    origin: '*', // ou lista de domínios
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useLogger(app.get(CustomLogger));
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(CustomLogger)));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000).then(() => {
    console.log(
      `server running on http://localhost:${process.env.PORT ?? 3000} \ndocs running on http://localhost:${process.env.PORT ?? 3000}/api/docs`,
    );
  });
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
