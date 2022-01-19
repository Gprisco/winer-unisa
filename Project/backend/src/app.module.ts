import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import env from './config/env';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { HasherModule } from './hasher/hasher.module';
import { Role } from './user/role.entity';

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
        entities: [User, Role],
        synchronize: false,
        debug: configService.get('db.debug'),
      }),
      inject: [ConfigService],
    }),
    HasherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
