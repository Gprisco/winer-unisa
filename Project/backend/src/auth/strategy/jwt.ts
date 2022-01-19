import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserPayloadDto } from '../dto/UserPayload.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: UserPayloadDto) {
    try {
      const user = await this.userService.getUserByEmail(payload.email);
      if (!user) throw new UnauthorizedException();

      return { sub: payload.sub, email: payload.email };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
