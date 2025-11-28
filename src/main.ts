import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '../swagger.config';
import { ConsoleLogger } from '@nestjs/common';
import { GlobalExceptionFilter } from './services/catch.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  setupSwagger(app);

  app.enableCors({
    origin: ['http://localhost:3000', 'https://gearbase-5efa.onrender.com/'], // ou lista de domínios
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      timestamp: true,
      logLevels: ['warn', 'error'],
      colors: true,
      json: true,
    }),
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 3000).then(() => {
    console.log(
      `🔥 server running on http://localhost:${process.env.PORT ?? 3000} \n📖 docs running on http://localhost:${process.env.PORT ?? 3000}/api/docs`,
    );
  });
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
