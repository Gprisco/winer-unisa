import {
  Controller,
  Post,
  UseGuards,
  Request,
  Inject,
  Get,
  Body,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginDto } from './dto/login';
import { UserPayloadDto } from './dto/UserPayload.dto';
import { JwtAuthGuard } from './guard/jwt';

@Controller('auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @Inject()
  private userService: UserService;

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginDto })
  login(@Request() req: Express.Request) {
    return this.authService.login(req.user as User);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req: Express.Request) {
    const userResponse = await this.userService.getUserByEmail(
      (req.user as UserPayloadDto).email,
    );

    if (!userResponse.success) throw new UnauthorizedException();

    const { password: _, ...user } = userResponse.user;

    return user;
  }

  @Post('register')
  async createUser(@Body() user: CreateUserDto) {
    const createUserResponse = await this.authService.register(user);

    if (!createUserResponse.success) return new InternalServerErrorException();

    return;
  }
}
