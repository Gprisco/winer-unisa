import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import env from '../src/config/env';
import { CartModule } from '../src/cart/cart.module';
import { validUser } from './user-data';
import { AuthModule } from '../src/auth/auth.module';
import { Connection } from 'typeorm';

describe('CartController (e2e)', () => {
  let app: INestApplication;
  jest.setTimeout(30000);

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
          }),
          inject: [ConfigService],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    await app.init();

    await request(app.getHttpServer()).post('/auth/register').send(validUser);
  });

  it('should get an empty cart', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send(validUser)
      .then((loginResponse) => {
        request(app.getHttpServer())
          .get('/cart')
          .set('Authorization', 'Bearer ' + loginResponse.body.access_token)
          .expect(200)
          .then((response) => {
            expect(response.body).toBeInstanceOf(Array);
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });

  afterAll(async () => {
    const connection = app.get(Connection);
    await connection.close();
    await app.close();
  });
});
