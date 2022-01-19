import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'w_winegrape' })
export class Winegrape {
  @PrimaryGeneratedColumn('increment')
  winegrapeId: number;

  @Column('varchar')
  winegrape: string;
}
