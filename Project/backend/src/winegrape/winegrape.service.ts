import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Winegrape } from '../wine/entities/winegrape.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WinegrapeService {
  @InjectRepository(Winegrape)
  private winegrapeRepository: Repository<Winegrape>;

  async findAll() {
    try {
      return this.winegrapeRepository.find();
    } catch (error) {
      return [];
    }
  }
}
