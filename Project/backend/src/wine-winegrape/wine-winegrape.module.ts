import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WineWinegrape } from '../wine-winegrape/entities/wineWinegrape.entity';
import { WineWinegrapeService } from './wine-winegrape.service';

@Module({
  imports: [TypeOrmModule.forFeature([WineWinegrape])],
  providers: [WineWinegrapeService],
  exports: [WineWinegrapeService],
})
export class WineWinegrapeModule {}
