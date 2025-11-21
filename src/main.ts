import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'swagger.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000).then(() => {
    console.log(
      `server running on http://localhost:${process.env.PORT ?? 3000}`,
    );
  });
}
bootstrap();
