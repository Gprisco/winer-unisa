import { Injectable } from '@nestjs/common';
import {
  FindConditions,
  Between,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';
import { FilterWine } from './dto/filter-wine.dto';
import { Wine } from './entities/wine.entity';

@Injectable()
export class FilterWinesHelper {
  buildFilterWineQuery(filterWine: FilterWine): FindConditions<Wine> {
    const where: FindConditions<Wine> = {};

    const { priceMin, priceMax, page: _, ...options } = filterWine;

    if (!isNaN(priceMin) && !isNaN(priceMax))
      where.price = Between(priceMin, priceMax);
    else if (!isNaN(priceMin)) where.price = MoreThanOrEqual(priceMin);
    else if (!isNaN(priceMax)) where.price = LessThanOrEqual(priceMax);

    Object.keys(options).forEach((key: keyof FilterWine) => {
      where[key] = options[key];
    });

    return where;
  }
}
