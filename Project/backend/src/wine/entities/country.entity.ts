import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'g_country' })
export class Country {
  @PrimaryGeneratedColumn('increment')
  countryId: number;

  @Column('varchar')
  country: string;
}
