import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWineDto } from './dto/create-wine.dto';
import { FilterWineDto } from './dto/filter-wine.dto';
import { UpdateWineDto } from './dto/update-wine.dto';
import { Wine } from './entities/wine.entity';

const pageSize = 50;

@Injectable()
export class WineService {
  @InjectRepository(Wine)
  private wineRepository: Repository<Wine>;

  create(createWineDto: CreateWineDto) {
    return 'This action adds a new wine';
  }

  async findAll(filterWines: FilterWineDto) {
    try {
      const wines = await this.wineRepository.find({
        take: pageSize,
        skip: filterWines.page * pageSize,
        relations: ['winegrapes', 'winefamily', 'winery'],
      });

      return wines;
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} wine`;
  }

  update(id: number, updateWineDto: UpdateWineDto) {
    return `This action updates a #${id} wine`;
  }

  remove(id: number) {
    return `This action removes a #${id} wine`;
  }
}
