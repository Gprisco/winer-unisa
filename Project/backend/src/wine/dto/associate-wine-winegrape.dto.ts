import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class AssociateWineWinegrapeDto {
  @ApiProperty({
    name: 'winegrapeId',
    description: 'The winegrapeId to associate',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  winegrapeId: number;

  @ApiProperty({
    name: 'percentage',
    description: 'The percentage of the winegrape',
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  percentage: number;
}
