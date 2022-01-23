import {
  Controller,
  Post,
  UseGuards,
  Request,
  Inject,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginDto } from './dto/login';
import { UserPayloadDto } from './dto/UserPayload.dto';
import { JwtAuthGuard } from './guard/jwt';

@Controller('auth')
@ApiTags('Auth')
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
  getProfile(@Request() req: Express.Request): UserPayloadDto {
    return req.user as UserPayloadDto;
  }

  @Post('register')
  async createUser(@Body() user: CreateUserDto) {
    return await this.authService.register(user);
  }
}
