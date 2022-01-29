import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { PlatformRole } from 'src/user/role.entity';
import { WinefamilyService } from './winefamily.service';

@Roles(PlatformRole.MANAGER)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@ApiTags('Winefamily')
@Controller('winefamily')
export class WinefamilyController {
  constructor(private readonly winefamilyService: WinefamilyService) {}

  @Get()
  findAll() {
    return this.winefamilyService.findAll();
  }
}
