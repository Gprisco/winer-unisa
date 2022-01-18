import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    name: 'email',
    description: 'The email of the user to log in',
  })
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'The password of the user to log in',
  })
  password: string;
}
