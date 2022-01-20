import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class FilterWine {
  @ApiProperty({
    name: 'wine',
    description: 'The name of the wine',
    required: false,
  })
  @IsString()
  wine: string;

  @ApiProperty({
    name: 'vintage',
    description: 'The vintage of the wine',
    required: false,
  })
  @IsInt()
  vintage: number;

  @ApiProperty({
    name: 'winefamilyId',
    description: 'The ID of the winefamily of the wine',
    required: false,
  })
  @IsInt()
  winefamilyId: number;

  @ApiProperty({
    name: 'wineryId',
    description: 'The ID of the winery which produced the wine',
    required: false,
  })
  @IsInt()
  wineryId: number;

  @ApiProperty({
    name: 'price',
    description: 'The price of the wine',
    required: false,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    name: 'availability',
    description: 'The number of available wine bottles to sell',
    required: false,
  })
  @IsInt()
  availability: number;

  @ApiProperty({
    name: 'page',
    description: 'The page to get (starting from 0)',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  page: number;
}
