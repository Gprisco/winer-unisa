import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from '../src/auth/auth.module';
import env from '../src/config/env';
import { HasherModule } from '../src/hasher/hasher.module';
import * as assert from 'assert';
import { invalidUser, validUser } from './user-data';
import { Connection } from 'typeorm';
import { PlatformRole } from '../src/user/role.entity';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  jest.setTimeout(30000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        UserModule,
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
        HasherModule,
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
  });

  it('should create an admin user', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(validUser)
      .expect(201);
  });

  it('should not create the same user', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(validUser)
      .expect(400);
  });

  it('should fail creating a user', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(invalidUser)
      .expect(400);
  });

  it('should complain about email format', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'notValidemail',
        password: validUser.password,
      })
      .expect(400);
  });

  it('should issue an access_token', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send(validUser)
      .expect(201)
      .then((response) => {
        assert(!!response.body.access_token, 'Token not in response');
        done();
      })
      .catch((err) => done(err));
  });

  it('should return 401 for invalid user', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(invalidUser)
      .expect(401);
  });

  it('should return an admin user profile', (done) => {
    const responsePromise = request(app.getHttpServer())
      .post('/auth/login')
      .send(validUser);

    responsePromise
      .then((response) => {
        request(app.getHttpServer())
          .get('/auth/profile')
          .set('Authorization', 'Bearer ' + response.body.access_token)
          .expect(200)
          .then((profile) => {
            assert(
              profile.body.roles.includes(PlatformRole.MANAGER),
              'The profile does not contin a manager platform role',
            );
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });

  it('should return 401 for invalid token', () => {
    return request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', 'Bearer not-valid-token')
      .expect(401);
  });

  afterAll(async () => {
    const connection = app.get(Connection);
    await connection.close();
    await app.close();
  });
});
