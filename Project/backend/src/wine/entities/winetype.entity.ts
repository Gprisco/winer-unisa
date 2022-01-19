import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'w_winetype' })
export class Winetype {
  @PrimaryGeneratedColumn('increment')
  winetypeId: number;

  @Column('varchar')
  winetype: string;
}
