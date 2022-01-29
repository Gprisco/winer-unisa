import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Winefamily } from './entities/winefamily.entity';

@Injectable()
export class WinefamilyService {
  @InjectRepository(Winefamily)
  private winefamilyRepository: Repository<Winefamily>;

  async findAll() {
    try {
      return await this.winefamilyRepository.find();
    } catch (error) {
      return [];
    }
  }
}
