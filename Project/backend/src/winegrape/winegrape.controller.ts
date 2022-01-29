import { Controller, Get, UseGuards } from '@nestjs/common';
import { WinegrapeService } from './winegrape.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt';
import { Roles } from 'src/auth/decorators/role.decorator';
import { PlatformRole } from 'src/user/role.entity';
import { RolesGuard } from 'src/auth/guard/role.guard';
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
