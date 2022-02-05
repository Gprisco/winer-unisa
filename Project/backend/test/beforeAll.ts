import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { validUser } from './user-data';

export default async function initTestApp(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.init();

  await request(app.getHttpServer()).post('/auth/register').send(validUser);
}
