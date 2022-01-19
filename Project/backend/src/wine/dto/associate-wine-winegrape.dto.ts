import { ApiProperty } from '@nestjs/swagger';

export class AssociateWineWinegrapeDto {
  @ApiProperty({
    name: 'winegrapeId',
    description: 'The winegrapeId to associate',
    required: true,
  })
  winegrapeId: number;

  @ApiProperty({
    name: 'percentage',
    description: 'The percentage of the winegrape',
    required: true,
  })
  percentage: number;
}
