import { Inject, Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class PaymentService {
  @Inject()
  private orderService: OrderService;

  @Inject()
  private cartService: CartService;

  async completeOrder(userID: number, address: string) {
    try {
      const cartItems = await this.cartService.findAll(userID);

      const order = await this.orderService.create(
        {
          wines: cartItems.map((cartItem) => ({
            winePK: cartItem.winePK,
            vintage: cartItem.vintage,
            quantity: cartItem.quantity,
            price: cartItem.wine.price,
          })),
          address,
        },
        userID,
      );

      this.cartService.empty(userID);

      return order;
    } catch (error) {
      throw error;
    }
  }
}
