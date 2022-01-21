import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { OrderModule } from 'src/order/order.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [OrderModule, CartModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
