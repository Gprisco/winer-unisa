import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWineDto } from './dto/create-wine.dto';
import { FilterWine } from './dto/filter-wine.dto';
import { UpdateWineDto } from './dto/update-wine.dto';
import { Wine } from './entities/wine.entity';
import { WineWinegrapeService } from 'src/wine-winegrape/wine-winegrape.service';
import { FilterWinesHelper } from './filter-wine.helper';
import { PaginationService } from 'src/helpers/pagination.service';
import { allWineRelations } from './common/wine.all-relations';

@Injectable()
export class WineService {
  @InjectRepository(Wine)
  private wineRepository: Repository<Wine>;

  @Inject()
  private wineWinegrapeService: WineWinegrapeService;

  @Inject()
  private filterWinesHelper: FilterWinesHelper;

  @Inject()
  private paginationService: PaginationService;

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
      const where = this.filterWinesHelper.buildFilterWineQuery(filterWines);

      const paginatedData = await this.paginationService.paginate(
        filterWines.page,
        this.wineRepository,
        { where, relations: [...allWineRelations] },
      );

      const query = this.wineRepository.createQueryBuilder();
      query.select('MAX(price)', 'price');
      query.where(where);

      const maxPrice = await query.getRawOne();

      return { ...paginatedData, maxPrice: maxPrice ? maxPrice.price || 0 : 0 };
    } catch (error) {
      throw error;
    }
  }

  async findOne(wine: string, vintage: number) {
    try {
      const foundWine = await this.wineRepository.findOne(
        { wine, vintage },
        {
          relations: [...allWineRelations],
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
