import { ApiProperty } from '@nestjs/swagger';
import { AssociateWineWinegrapeDto } from './associate-wine-winegrape.dto';
import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsArray,
  IsNumber,
} from 'class-validator';

export class CreateWineDto {
  @ApiProperty({
    name: 'wine',
    description: 'The name of the wine',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  wine: string;

  @ApiProperty({
    name: 'vintage',
    description: 'The vintage of the wine',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  vintage: number;

  @ApiProperty({
    name: 'winefamilyId',
    description: 'The ID of the winefamily of the wine',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  winefamilyId: number;

  @ApiProperty({
    name: 'wineryId',
    description: 'The ID of the winery which produced the wine',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  wineryId: number;

  @ApiProperty({
    name: 'winegrapes',
    description: 'Array of winegrapes to associate to the wine',
    required: true,
    type: [AssociateWineWinegrapeDto],
  })
  @IsArray()
  winegrapes: AssociateWineWinegrapeDto[];

  @ApiProperty({
    name: 'price',
    description: 'The price of the wine',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    name: 'availability',
    description: 'The number of available wine bottles to sell',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  availability: number;
}
