import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from './country.entity';

@Entity({ name: 'g_region' })
export class Region {
  @PrimaryGeneratedColumn('increment')
  regionId: number;

  @Column('varchar')
  region: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'countryId', referencedColumnName: 'countryId' })
  country: Country;
}
