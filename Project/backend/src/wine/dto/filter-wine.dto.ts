import { PartialType } from '@nestjs/swagger';
import { CreateWineDto } from './create-wine.dto';

export class FilterWineDto extends PartialType(CreateWineDto) {
  page: number;
}
