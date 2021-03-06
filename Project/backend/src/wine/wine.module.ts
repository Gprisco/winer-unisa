import { Module } from '@nestjs/common';
import { WineService } from './wine.service';
import { WineController } from './wine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wine } from './entities/wine.entity';
import { WineWinegrapeModule } from '../wine-winegrape/wine-winegrape.module';
import { FilterWinesHelper } from './filter-wine.helper';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wine]),
    WineWinegrapeModule,
    HelpersModule,
  ],
  controllers: [WineController],
  providers: [WineService, FilterWinesHelper],
  exports: [WineService],
})
export class WineModule {}
