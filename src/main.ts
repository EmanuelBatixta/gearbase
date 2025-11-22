import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from '../swagger.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);

  app.enableCors({
    origin: ['http://localhost:3000','https://gearbase-5efa.onrender.com/'], // ou lista de domínios
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000).then(() => {
    console.log(
      `server running on http://localhost:${process.env.PORT ?? 3000}`,
    );
  });
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
