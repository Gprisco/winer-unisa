import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssociateWineWinegrapeDto } from 'src/wine/dto/associate-wine-winegrape.dto';
import { Repository } from 'typeorm';
import { WineWinegrape } from './entities/wineWinegrape.entity';

@Injectable()
export class WineWinegrapeService {
  constructor(
    @InjectRepository(WineWinegrape)
    private wineWinegrapeRepository: Repository<WineWinegrape>,
  ) {}

  async createWineWinegrapes(
    forWine: { wine: string; vintage: number },
    winegrapes: AssociateWineWinegrapeDto[],
    createFromScratch = false,
  ): Promise<WineWinegrape[]> {
    try {
      if (createFromScratch)
        await this.wineWinegrapeRepository.delete({
          winePK: forWine.wine,
          vintage: forWine.vintage,
        });

      const wineWinegrapes = winegrapes.map((wg) =>
        this.wineWinegrapeRepository.create({
          winePK: forWine.wine,
          vintage: forWine.vintage,
          winegrapeId: wg.winegrapeId,
          percentage: wg.percentage,
        }),
      );

      await this.wineWinegrapeRepository.save(wineWinegrapes);
      return wineWinegrapes;
    } catch (error) {
      return [];
    }
  }
}
