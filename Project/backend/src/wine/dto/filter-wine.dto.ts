import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterWine {
  @ApiProperty({
    name: 'wine',
    description: 'The name of the wine',
    required: false,
  })
  @IsString()
  @IsOptional()
  wine?: string;

  @ApiProperty({
    name: 'vintage',
    description: 'The vintage of the wine',
    required: false,
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  vintage?: number;

  @ApiProperty({
    name: 'winefamilyId',
    description: 'The ID of the winefamily of the wine',
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  winefamilyId?: number;

  @ApiProperty({
    name: 'wineryId',
    description: 'The ID of the winery which produced the wine',
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  wineryId?: number;

  @ApiProperty({
    name: 'priceMin',
    description: 'The minimum price of the wine',
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  priceMin?: number;

  @ApiProperty({
    name: 'priceMax',
    description: 'The maximum price of the wine',
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  priceMax?: number;

  @ApiProperty({
    name: 'availability',
    description: 'The number of available wine bottles to sell',
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  availability?: number;

  @ApiProperty({
    name: 'page',
    description: 'The page to get (starting from 0)',
    required: true,
  })
  @Type(() => Number)
  @IsInt()
  page: number;
}
