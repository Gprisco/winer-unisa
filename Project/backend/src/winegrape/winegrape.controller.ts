import { Controller, Get, UseGuards } from '@nestjs/common';
import { WinegrapeService } from './winegrape.service';
import { JwtAuthGuard } from '../auth/guard/jwt';
import { Roles } from '../auth/decorators/role.decorator';
import { PlatformRole } from '../user/role.entity';
import { RolesGuard } from '../auth/guard/role.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Roles(PlatformRole.MANAGER)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('winegrape')
@ApiTags('Winegrape')
export class WinegrapeController {
  constructor(private readonly winegrapeService: WinegrapeService) {}

  @Get()
  findAll() {
    return this.winegrapeService.findAll();
  }
}
