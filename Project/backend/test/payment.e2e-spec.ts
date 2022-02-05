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
import { PaymentModule } from '../src/payment/payment.module';

describe('CartController (e2e)', () => {
  let app: INestApplication;
  let bearerToken: string;
  jest.setTimeout(60000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        CartModule,
        PaymentModule,
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

  it('should create an order after payment', async () => {
    await request(app.getHttpServer())
      .post('/cart')
      .set('Authorization', bearerToken)
      .send({
        winePK: 'capatosta',
        vintage: 2016,
        quantity: 1,
      })
      .expect(201);

    return request(app.getHttpServer())
      .post('/payment')
      .set('Authorization', bearerToken)
      .send({
        creditCardNumber: '4242424242424242',
        cvc: '333',
        address: '5th Avenue',
      })
      .expect(201);
  });

  it('should invalidate credit card number', () => {
    return request(app.getHttpServer())
      .post('/payment')
      .set('Authorization', bearerToken)
      .send({
        creditCardNumber: '4242424242424',
        cvc: '333',
        address: '5th Avenue',
      })
      .expect(400);
  });

  it('should invalidate cvc', () => {
    return request(app.getHttpServer())
      .post('/payment')
      .set('Authorization', bearerToken)
      .send({
        creditCardNumber: '4242424242424242',
        cvc: '33',
        address: '5th Avenue',
      })
      .expect(400);
  });

  afterAll(async () => {
    const connection = app.get(Connection);
    await connection.close();
    await app.close();
  });
});
