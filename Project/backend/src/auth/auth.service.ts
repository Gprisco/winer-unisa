import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
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
    const payload: UserPayloadDto = { email: user.email, sub: user.userID };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    return await this.userService.createUser(user);
  }
}
