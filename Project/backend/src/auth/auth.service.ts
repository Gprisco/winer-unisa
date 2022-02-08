import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserPayloadDto } from './dto/UserPayload.dto';

@Injectable()
export class AuthService {
  @Inject()
  private userService: UserService;

  @Inject()
  private jwtService: JwtService;

  async validatePassword(email: string, password: string): Promise<User> {
    const userResponse = await this.userService.getUserByEmail(email);

    if (!userResponse.success) return null;

    if (await this.userService.checkUserPassword(userResponse.user, password))
      return userResponse.user;
  }

  login(user: User) {
    const payload: UserPayloadDto = {
      email: user.email,
      sub: user.userID,
      roles: user.roles.map((role) => role.roleName),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private checkPassword(password: string): boolean {
    const regex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return regex.test(password) && password.length >= 8;
  }

  async register(user: CreateUserDto) {
    if (this.checkPassword(user.password))
      return await this.userService.createUser(user);

    throw new BadRequestException(
      'La password deve essere lunga almeno 8 caratteri, contenere lettere minuscole e maiuscole, almeno 1 numero o 1 carattere speciale',
    );
  }
}
