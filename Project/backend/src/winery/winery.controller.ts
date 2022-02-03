import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt';
import { RolesGuard } from '../auth/guard/role.guard';
import { PlatformRole } from '../user/role.entity';
import { WineryService } from './winery.service';

@Roles(PlatformRole.MANAGER)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('winery')
@ApiTags('Winery')
export class WineryController {
  constructor(private readonly wineryService: WineryService) {}

  @Get()
  findAll() {
    return this.wineryService.findAll();
  }
}
