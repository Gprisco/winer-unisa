import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart.entity';
import { WineModule } from 'src/wine/wine.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), WineModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
