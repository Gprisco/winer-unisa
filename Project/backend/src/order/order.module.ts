import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderWine } from './entities/order-wine.entity';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderWine]), HelpersModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
