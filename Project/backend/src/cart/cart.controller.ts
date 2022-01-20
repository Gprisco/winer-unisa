import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserPayloadDto } from 'src/auth/dto/UserPayload.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto, UpdateCartItemParams } from './dto/update-cart.dto';

@ApiBearerAuth()
@ApiTags('Cart')
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(
    @Body() createCartDto: CreateCartDto,
    @Request() req: Express.Request,
  ) {
    const user = req.user as UserPayloadDto;
    return this.cartService.create(createCartDto, user.sub);
  }

  @Get()
  findAll(@Request() req: Express.Request) {
    return this.cartService.findAll((req.user as UserPayloadDto).sub);
  }

  @Patch(':wine/:vintage')
  @ApiParam({
    name: 'wine',
    description: 'The name of the wine to update in the cart',
    required: true,
  })
  @ApiParam({
    name: 'vintage',
    description: 'The vintage of the wine to update in the cart',
    required: true,
  })
  update(
    @Param() params: UpdateCartItemParams,
    @Body() updateCartDto: UpdateCartDto,
    @Request() req: Express.Request,
  ) {
    const user = req.user as UserPayloadDto;

    return this.cartService.update(
      params.wine,
      params.vintage,
      user.sub,
      updateCartDto,
    );
  }

  @Delete(':wine/:vintage')
  @ApiParam({
    name: 'wine',
    description: 'The name of the wine to delete from the cart',
    required: true,
  })
  @ApiParam({
    name: 'vintage',
    description: 'The vintage of the wine to delete from the cart',
    required: true,
  })
  remove(
    @Param() { wine, vintage }: UpdateCartItemParams,
    @Request() req: Express.Request,
  ) {
    const user = req.user as UserPayloadDto;
    return this.cartService.remove(wine, vintage, user.sub);
  }
}
