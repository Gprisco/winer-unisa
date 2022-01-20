import { Module } from '@nestjs/common';
import { WineService } from './wine.service';
import { WineController } from './wine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wine } from './entities/wine.entity';
import { WineWinegrapeModule } from 'src/wine-winegrape/wine-winegrape.module';
import { WineWinegrapeService } from 'src/wine-winegrape/wine-winegrape.service';
import { FilterWinesHelper } from './filter-wine.helper';

@Module({
  imports: [TypeOrmModule.forFeature([Wine]), WineWinegrapeModule],
  controllers: [WineController],
  providers: [WineService, WineWinegrapeService, FilterWinesHelper],
})
export class WineModule {}
