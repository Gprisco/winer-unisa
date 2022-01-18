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
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginDto } from './dto/login';
import { JwtAuthGuard } from './guard/jwt';

@Controller('auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginDto })
  login(@Request() req: Express.Request) {
    return this.authService.login(req.user as User);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req: Express.Request) {
    return req.user;
  }

  @Post('register')
  createUser(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
