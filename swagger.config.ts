import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('GearBase API')
    .setDescription(
      'API documentation for GearBase application, this application is a car management system that allows users to perform CRUD operations on car entities.',
    )
    .addServer('http://localhost:3000')
    .addServer('https://gearbase-5efa.onrender.com')
    //.addServer('https://gearbaseapi.vercel.app/')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'API Key',
        in: 'header',
        name: 'Authorization',
      },
      'access-token',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
}
