import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWineDto } from './dto/create-wine.dto';
import { FilterWine } from './dto/filter-wine.dto';
import { UpdateWineDto } from './dto/update-wine.dto';
import { Wine } from './entities/wine.entity';
import { WineWinegrapeService } from 'src/wine-winegrape/wine-winegrape.service';
import { FilterWinesHelper } from './filter-wine.helper';

const pageSize = 50;

@Injectable()
export class WineService {
  @InjectRepository(Wine)
  private wineRepository: Repository<Wine>;

  @Inject()
  private wineWinegrapeService: WineWinegrapeService;

  @Inject()
  private filterWinesHelper: FilterWinesHelper;

  async create(createWineDto: CreateWineDto) {
    try {
      const { winegrapes, ...wineData } = createWineDto;

      const wineWinegrapes =
        await this.wineWinegrapeService.createWineWinegrapes(
          {
            wine: wineData.wine,
            vintage: wineData.vintage,
          },
          winegrapes,
        );

      const wine = this.wineRepository.create(wineData);
      wine.winegrapes = wineWinegrapes;

      await this.wineRepository.save(wine);
    } catch (error) {
      throw error;
    }
  }

  async findAll(filterWines: FilterWine) {
    try {
      const dbPage = +filterWines.page - 1;
      const skip = dbPage * pageSize;

      const where = this.filterWinesHelper.buildFilterWineQuery(filterWines);

      const [wines, totalWines] = await this.wineRepository.findAndCount({
        take: pageSize,
        skip,
        relations: ['winegrapes', 'winefamily', 'winery'],
        where,
      });

      return {
        totalWines,
        position: skip + wines.length,
        pageSize,
        currentPage: +filterWines.page,
        wines,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(wine: string, vintage: number) {
    try {
      const foundWine = await this.wineRepository.findOne(
        { wine, vintage },
        {
          relations: [
            'winery',
            'winefamily',
            'winefamily.winecolor',
            'winefamily.winetype',
            'winefamily.winedenom',
            'winefamily.region',
            'winefamily.region.country',
            'winegrapes',
          ],
        },
      );

      if (!foundWine) throw new NotFoundException();

      return foundWine;
    } catch (error) {
      throw error;
    }
  }

  async update(wine: string, vintage: number, updateWineDto: UpdateWineDto) {
    try {
      const foundWine = await this.wineRepository.findOne({ wine, vintage });
      if (!foundWine) throw new NotFoundException();

      const { winegrapes, ...wineData } = updateWineDto;

      Object.keys(wineData).forEach((key: keyof typeof wineData) => {
        foundWine[key] = updateWineDto[key] as never;
      });

      if (winegrapes) {
        const wineWinegrapes =
          await this.wineWinegrapeService.createWineWinegrapes(
            {
              wine,
              vintage,
            },
            winegrapes,
            true,
          );

        foundWine.winegrapes = wineWinegrapes;
      }

      return this.wineRepository.save(foundWine);
    } catch (error) {
      throw error;
    }
  }

  async remove(wine: string, vintage: number) {
    try {
      return await this.wineRepository.delete({ wine, vintage });
    } catch (error) {
      throw error;
    }
  }

  async checkAvailability(
    wine: string,
    vintage: number,
    quantity: number,
  ): Promise<[Wine, boolean]> {
    try {
      const dbWine = await this.findOne(wine, vintage);

      if (!dbWine) throw new NotFoundException();

      return [dbWine, dbWine.availability >= quantity];
    } catch (error) {
      throw error;
    }
  }
}
