import { Module } from '@nestjs/common';
import { WinegrapeService } from './winegrape.service';
import { WinegrapeController } from './winegrape.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Winegrape } from '../wine/entities/winegrape.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Winegrape])],
  controllers: [WinegrapeController],
  providers: [WinegrapeService],
})
export class WinegrapeModule {}
