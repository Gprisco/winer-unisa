import { ApiProperty } from '@nestjs/swagger';
import { IsCreditCard, IsString, Length } from 'class-validator';

export class PaymentDto {
  @ApiProperty({
    name: 'creditCardNumber',
    description: 'The number of the credit card',
    required: true,
  })
  @IsCreditCard()
  creditCardNumber: string;

  @ApiProperty({
    name: 'cvc',
    description: 'The CVC of the credit card',
    required: true,
  })
  @IsString()
  @Length(3, 3)
  cvc: string;

  @ApiProperty({
    name: 'address',
    description: 'The Address to which to deliver the order',
    required: true,
  })
  @IsString()
  @Length(3, 100)
  address: string;
}
