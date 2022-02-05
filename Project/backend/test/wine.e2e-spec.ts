import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from '../src/auth/auth.module';
import env from '../src/config/env';
import * as assert from 'assert';
import { Connection } from 'typeorm';
import { WineModule } from '../src/wine/wine.module';
import initTestApp from './beforeAll';
import { CreateWineDto } from '../src/wine/dto/create-wine.dto';
import performLogin from './helpers/performLogin';
import { UpdateWineDto } from 'src/wine/dto/update-wine.dto';

describe('WineController (e2e)', () => {
  let app: INestApplication;
  let bearerToken: string;
  jest.setTimeout(60000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        WineModule,
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

    const loginResponse = await performLogin(app);
    bearerToken = 'Bearer ' + loginResponse.body.access_token;
  });

  it('should get the catalog', async () => {
    const response = await request(app.getHttpServer())
      .get('/wine?page=1')
      .expect(200);

    assert(response.body.currentPage === 1);
    assert(response.body.data instanceof Array);
  });

  it('should create a wine', () => {
    return request(app.getHttpServer())
      .post('/wine')
      .set('Authorization', bearerToken)
      .send({
        wine: 'nuovo-vino',
        vintage: 2017,
        winefamilyId: 297,
        wineryId: 546,
        winegrapes: [],
        price: 10.0,
        availability: 40,
      } as CreateWineDto)
      .expect(201);
  });

  it('should get wine details', async () => {
    const response = await request(app.getHttpServer())
      .get('/wine/capatosta/2016')
      .expect(200);

    assert(response.body.wine === 'capatosta');
    assert(response.body.vintage === 2016);
    return;
  });

  it('should update an existing wine', () => {
    return request(app.getHttpServer())
      .patch(`/wine/capatosta/2016`)
      .set('Authorization', bearerToken)
      .send({
        winefamilyId: 297,
        wineryId: 546,
      } as UpdateWineDto)
      .expect(200);
  });

  it('should delete a wine', () => {
    return request(app.getHttpServer())
      .delete('/wine/nuovo-vino/2017')
      .set('Authorization', bearerToken)
      .expect(200);
  });

  afterAll(async () => {
    const connection = app.get(Connection);
    await connection.close();
    await app.close();
  });
});
