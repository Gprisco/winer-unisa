import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import env from '../src/config/env';
import { CartModule } from '../src/cart/cart.module';
import { AuthModule } from '../src/auth/auth.module';
import { Connection } from 'typeorm';
import initTestApp from './beforeAll';
import performLogin from './helpers/performLogin';
import { assert } from 'console';

describe('CartController (e2e)', () => {
  let app: INestApplication;
  let bearerToken: string;
  jest.setTimeout(60000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        CartModule,
        ConfigModule.forRoot({
          isGlobal: true,
          ignoreEnvFile: false,
          envFilePath: '.env.test',
          load: [env],
        }),
        TypeOrmModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get('db.host'),
            port: configService.get('db.port'),
            username: configService.get('db.user'),
            password: configService.get('db.password'),
            database: configService.get('db.schema'),
            entities: [join(__dirname, '..', 'src', '**', '**.entity.{ts,js}')],
            synchronize: true,
            debug: configService.get('db.debug'),
            dropSchema: true,
            keepConnectionAlive: true,
            migrationsRun: true,
            migrations: [join(__dirname, 'migrations', '**.ts')],
          }),
          inject: [ConfigService],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await initTestApp(app);

    const loginReponse = await performLogin(app);
    bearerToken = 'Bearer ' + loginReponse.body.access_token;
  });

  it('should get an empty cart', async () => {
    const response = await request(app.getHttpServer())
      .get('/cart')
      .set('Authorization', bearerToken)
      .expect(200);

    assert(response.body instanceof Array);
  });

  it('should fail adding a non-existing wine to the cart', async () => {
    return request(app.getHttpServer())
      .post('/cart')
      .set('Authorization', bearerToken)
      .send({
        winePK: 'non-existing-wine',
        vintage: 2020,
        quantity: 1,
      })
      .expect(404);
  });

  it('should add a wine to the cart', () => {
    return request(app.getHttpServer())
      .post('/cart')
      .set('Authorization', bearerToken)
      .send({
        winePK: 'capatosta',
        vintage: 2016,
        quantity: 1,
      })
      .expect(201);
  });

  it('should not update a wine quantity in the cart (quantity > availability)', () => {
    return request(app.getHttpServer())
      .patch('/cart/capatosta/2016')
      .set('Authorization', bearerToken)
      .send({
        quantity: 6,
      })
      .expect(400);
  });

  it('should update a wine quantity', async () => {
    const res = await request(app.getHttpServer())
      .patch('/cart/capatosta/2016')
      .set('Authorization', bearerToken)
      .send({
        quantity: 2,
      })
      .expect(200);

    assert(res.body.quantity === 2);
  });

  it('should delete an item from the cart', () => {
    return request(app.getHttpServer())
      .delete('/cart/capatosta/2016')
      .set('Authorization', bearerToken)
      .expect(200);
  });

  afterAll(async () => {
    const connection = app.get(Connection);
    await connection.close();
    await app.close();
  });
});
