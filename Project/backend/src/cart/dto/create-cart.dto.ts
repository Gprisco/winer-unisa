import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCartDto {
  @ApiProperty({
    name: 'winePK',
    description: 'The name of the wine to add to the cart',
    required: true,
  })
  @IsString()
  winePK: string;

  @ApiProperty({
    name: 'vintage',
    description: 'The vintage of the wine to add to the cart',
    required: true,
  })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  vintage: number;

  @ApiProperty({
    name: 'quantity',
    description: 'The quantity of the wine the user wants to buy',
    required: true,
  })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}
