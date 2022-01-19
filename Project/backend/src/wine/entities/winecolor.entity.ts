import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'w_winecolor' })
export class Winecolor {
  @PrimaryGeneratedColumn('increment')
  winecolorId: number;

  @Column('varchar')
  winecolor: string;
}
