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

@Controller('wine')
@ApiTags('Wine')
export class WineController {
  constructor(private readonly wineService: WineService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createWineDto: CreateWineDto) {
    return this.wineService.create(createWineDto);
  }

  @Get()
  findAll(@Query() query: FilterWine) {
    return this.wineService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wineService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateWineDto: UpdateWineDto) {
    return this.wineService.update(+id, updateWineDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.wineService.remove(+id);
  }
}
