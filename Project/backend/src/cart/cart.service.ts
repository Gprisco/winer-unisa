import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { allWineRelations } from 'src/wine/common/wine.all-relations';
import { WineService } from 'src/wine/wine.service';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartItem } from './entities/cart.entity';

@Injectable()
export class CartService {
  @InjectRepository(CartItem)
  private cartItemRepository: Repository<CartItem>;

  @Inject()
  private wineService: WineService;

  async create(createCartDto: CreateCartDto, userID: number) {
    try {
      const [wine, isAvailable] = await this.wineService.checkAvailability(
        createCartDto.winePK,
        createCartDto.vintage,
        createCartDto.quantity,
      );

      if (!isAvailable)
        throw new BadRequestException([
          `La quantità selezionata supera la disponibilità del vino, bottiglie disponibili ${wine.availability}`,
        ]);

      const newCartItem = this.cartItemRepository.create({
        ...createCartDto,
        userID,
      });
      await this.cartItemRepository.save(newCartItem);
    } catch (error) {
      throw error;
    }
  }

  async findAll(userID: number) {
    try {
      return await this.cartItemRepository.find({
        where: { userID },
        relations: [
          'wine',
          ...allWineRelations.map((relation) => 'wine.' + relation),
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    wine: string,
    vintage: number,
    userID: number,
    updateCartDto: UpdateCartDto,
  ) {
    try {
      const cartItem = await this.cartItemRepository.findOne({
        winePK: wine,
        vintage,
        userID,
      });

      if (!cartItem) throw new NotFoundException();

      const [foundWine, isAvailable] = await this.wineService.checkAvailability(
        wine,
        vintage,
        updateCartDto.quantity,
      );

      if (!isAvailable)
        throw new BadRequestException([
          `La quantità selezionata supera la disponibilità del vino, bottiglie disponibili: ${foundWine.availability}`,
        ]);

      if (!isNaN(updateCartDto.quantity))
        cartItem.quantity = updateCartDto.quantity;

      return await this.cartItemRepository.save(cartItem);
    } catch (error) {
      throw error;
    }
  }

  async remove(wine: string, vintage: number, userID: number) {
    try {
      return await this.cartItemRepository.delete({
        winePK: wine,
        vintage,
        userID,
      });
    } catch (error) {
      throw error;
    }
  }

  async empty(userID: number) {
    try {
      return await this.cartItemRepository.delete({
        userID,
      });
    } catch (error) {
      throw error;
    }
  }
}
