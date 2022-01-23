import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationResponse } from './dto/pagination-response.dto';

@Injectable()
export class PaginationService {
  private static pageSize = 50;

  async paginate<T>(
    page: number,
    repository: Repository<T>,
    options: FindManyOptions<T>,
  ): Promise<PaginationResponse<T>> {
    try {
      const { pageSize } = PaginationService;
      const dbPage = page - 1;
      const skip = dbPage * pageSize;

      const [data, totalItems] = await repository.findAndCount({
        take: pageSize,
        skip,
        ...options,
      });

      return {
        totalItems,
        pages: Math.ceil(totalItems / pageSize),
        position: skip + data.length,
        pageSize,
        currentPage: page,
        data,
      };
    } catch (error) {
      throw error;
    }
  }
}
