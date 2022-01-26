import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { WineService } from './wine.service';
import { CreateWineDto } from './dto/create-wine.dto';
import { UpdateWineDto } from './dto/update-wine.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt';
import { FilterWine } from './dto/filter-wine.dto';
import { Roles } from 'src/auth/decorators/role.decorator';
import { PlatformRole } from 'src/user/role.entity';
import { RolesGuard } from 'src/auth/guard/role.guard';

@Controller('wine')
@ApiTags('Wine')
export class WineController {
  constructor(private readonly wineService: WineService) {}

  @Post()
  @Roles(PlatformRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  create(@Body() createWineDto: CreateWineDto) {
    return this.wineService.create(createWineDto);
  }

  @Get()
  findAll(@Query() query: FilterWine) {
    return this.wineService.findAll(query);
  }

  @Get(':wine/:vintage')
  async findOne(
    @Param('wine') wine: string,
    @Param('vintage') vintage: number,
  ) {
    return await this.wineService.findOne(wine, +vintage);
  }

  @Patch(':wine/:vintage')
  @Roles(PlatformRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  update(
    @Param('wine') wine: string,
    @Param('vintage') vintage: number,
    @Body() updateWineDto: UpdateWineDto,
  ) {
    return this.wineService.update(wine, +vintage, updateWineDto);
  }

  @Delete(':wine/:vintage')
  @Roles(PlatformRole.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  remove(@Param('wine') wine: string, @Param('vintage') vintage: number) {
    return this.wineService.remove(wine, +vintage);
  }
}
