import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'w_winedenom' })
export class Winedenom {
  @PrimaryGeneratedColumn('increment')
  winedenomId: number;

  @Column('varchar')
  winedenom: string;
}
