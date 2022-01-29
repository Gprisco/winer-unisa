import { Module } from '@nestjs/common';
import { WinefamilyService } from './winefamily.service';
import { WinefamilyController } from './winefamily.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Winefamily } from './entities/winefamily.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Winefamily])],
  controllers: [WinefamilyController],
  providers: [WinefamilyService],
})
export class WinefamilyModule {}
