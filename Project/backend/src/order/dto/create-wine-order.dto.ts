import { IsString, IsInt, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWineOrderDto {
  @IsString()
  winePK: string;

  @IsInt()
  @Type(() => Number)
  vintage: number;

  @IsInt()
  @Type(() => Number)
  quantity: number;

  @IsNumber()
  @Type(() => Number)
  price: number;
}
