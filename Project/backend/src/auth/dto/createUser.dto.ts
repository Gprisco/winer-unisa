import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    name: 'email',
    description: 'The email of the user to create',
  })
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'The password of the user to create',
  })
  password: string;
}
