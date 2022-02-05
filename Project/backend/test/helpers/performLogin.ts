import { INestApplication } from '@nestjs/common';
import { validUser } from '../user-data';
import * as request from 'supertest';

export default async function performLogin(app: INestApplication) {
  return request(app.getHttpServer())
    .post('/auth/login')
    .send(validUser)
    .expect(201);
}
