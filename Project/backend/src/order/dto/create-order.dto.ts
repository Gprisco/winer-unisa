import { CreateWineOrderDto } from './create-wine-order.dto';
import { IsString } from 'class-validator';

export class CreateOrderDto {
  wines: CreateWineOrderDto[];

  @IsString()
  address: string;
}
