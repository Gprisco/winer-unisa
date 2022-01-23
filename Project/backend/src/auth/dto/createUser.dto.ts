import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    name: 'email',
    description: 'The email of the user to create',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'The password of the user to create',
  })
  @IsString()
  password: string;
}
