import { ApiProperty } from '@nestjs/swagger';

export class FilterWine {
  @ApiProperty({
    name: 'wine',
    description: 'The name of the wine',
    required: false,
  })
  wine: string;

  @ApiProperty({
    name: 'vintage',
    description: 'The vintage of the wine',
    required: false,
  })
  vintage: number;

  @ApiProperty({
    name: 'winefamilyId',
    description: 'The ID of the winefamily of the wine',
    required: false,
  })
  winefamilyId: number;

  @ApiProperty({
    name: 'wineryId',
    description: 'The ID of the winery which produced the wine',
    required: false,
  })
  wineryId: number;

  @ApiProperty({
    name: 'price',
    description: 'The price of the wine',
    required: false,
  })
  price: number;

  @ApiProperty({
    name: 'availability',
    description: 'The number of available wine bottles to sell',
    required: false,
  })
  availability: number;

  @ApiProperty({
    name: 'page',
    description: 'The page to get (starting from 0)',
    required: true,
  })
  page: number;
}
