import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { PlatformRole } from 'src/user/role.entity';
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
