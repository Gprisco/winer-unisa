import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import env from './config/env';
import { UserModule } from './user/user.module';
import { HasherModule } from './hasher/hasher.module';
import { WineModule } from './wine/wine.module';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      envFilePath: '.env',
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
        entities: [join(__dirname, '**', '**.entity.{ts,js}')],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    HasherModule,
    WineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
