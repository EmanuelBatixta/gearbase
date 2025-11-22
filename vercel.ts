import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { Server } from 'http';
import { createServer } from 'http';

let server: Server;

/**
 * Handler que o Vercel vai chamar em cada requisição.
 */
export default async function handler(req, res) {
  if (!server) {
    const app = await NestFactory.create(AppModule);
    await app.init();

    server = createServer(app.getHttpAdapter().getInstance());
  }

  server.emit('request', req, res);
}
