import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, Min } from 'class-validator';

export class UpdateCartDto {
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

export class UpdateCartItemParams {
  @IsString()
  wine: string;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  vintage: number;
}
