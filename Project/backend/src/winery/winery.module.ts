import { Module } from '@nestjs/common';
import { WineryService } from './winery.service';
import { WineryController } from './winery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Winery } from './entities/winery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Winery])],
  controllers: [WineryController],
  providers: [WineryService],
})
export class WineryModule {}
