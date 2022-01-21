import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import env from './config/env';
import { UserModule } from './user/user.module';
import { HasherModule } from './hasher/hasher.module';
import { join } from 'path';
import { WineModule } from './wine/wine.module';
import { WineWinegrapeModule } from './wine-winegrape/wine-winegrape.module';
import { AppLoggerMiddleware } from './middlewares/logger.middleware';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { HelpersModule } from './helpers/helpers.module';
import { PaymentModule } from './payment/payment.module';

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
    WineWinegrapeModule,
    CartModule,
    OrderModule,
    HelpersModule,
    PaymentModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
