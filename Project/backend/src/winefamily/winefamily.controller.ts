import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt';
import { RolesGuard } from '../auth/guard/role.guard';
import { PlatformRole } from '../user/role.entity';
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
