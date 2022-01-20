import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/helpers/pagination.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderWine } from './entities/order-wine.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  @InjectRepository(Order)
  private orderRepository: Repository<Order>;

  @InjectRepository(OrderWine)
  private orderWineRepository: Repository<OrderWine>;

  @Inject()
  private paginationService: PaginationService;

  async create(createOrderDto: CreateOrderDto, userID: number) {
    try {
      const order = this.orderRepository.create({
        createdAt: new Date(),
        userID,
      });

      await this.orderRepository.save(order);

      const winesToBuy: OrderWine[] = [];
      createOrderDto.wines.forEach(({ winePK, vintage, quantity, price }) =>
        winesToBuy.push(
          this.orderWineRepository.create({
            winePK: winePK,
            vintage,
            quantity,
            price,
            orderID: order.orderID,
          }),
        ),
      );

      await this.orderWineRepository.save(winesToBuy);

      order.orderWine = winesToBuy;

      return order;
    } catch (error) {
      throw error;
    }
  }

  findAll(page: number) {
    try {
      return this.paginationService.paginate(page, this.orderRepository, {
        relations: ['orderWine'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.orderRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async confirmOrder(id: number) {
    try {
      const order = await this.orderRepository.findOne(id);

      if (!order) throw new NotFoundException();

      order.confirmed = true;

      // Here we should send an email to the user for his information...

      return await this.orderRepository.save(order);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.orderRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
