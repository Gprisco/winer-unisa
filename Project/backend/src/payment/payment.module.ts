import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { OrderModule } from '../order/order.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [OrderModule, CartModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
