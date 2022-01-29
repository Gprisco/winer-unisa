import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Winery } from './entities/winery.entity';

@Injectable()
export class WineryService {
  @InjectRepository(Winery)
  private wineryRepository: Repository<Winery>;

  async findAll() {
    try {
      return await this.wineryRepository.find();
    } catch (error) {
      return [];
    }
  }
}
