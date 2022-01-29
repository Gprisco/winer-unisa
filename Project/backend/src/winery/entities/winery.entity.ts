import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'w_winery' })
export class Winery {
  @PrimaryGeneratedColumn('increment')
  wineryId: number;

  @Column('varchar')
  winery: string;

  @Column('varchar')
  address: string;

  @Column('varchar')
  telephone: string;
}
