import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Winefamily } from './winefamily.entity';
import { Winery } from './winery.entity';
import { WineWinegrape } from '../../wine-winegrape/entities/wineWinegrape.entity';

@Entity({ name: 'w_wine' })
export class Wine {
  @PrimaryColumn('varchar')
  wine: string;

  @PrimaryColumn('int')
  vintage: number;

  @Column('float')
  price: number;

  @Column('int')
  availability: number;

  @Column('int')
  wineryId: number;

  @ManyToOne(() => Winery)
  @JoinColumn({ name: 'wineryId', referencedColumnName: 'wineryId' })
  winery: Winery;

  @Column('int')
  winefamilyId: number;

  @ManyToOne(() => Winefamily)
  @JoinColumn({ name: 'winefamilyId', referencedColumnName: 'winefamilyId' })
  winefamily: Winefamily;

  @OneToMany(() => WineWinegrape, (wineWinegrape) => wineWinegrape.wine)
  @JoinColumn([
    { name: 'wine', referencedColumnName: 'wine' },
    { name: 'vintage', referencedColumnName: 'vintage' },
  ])
  winegrapes: WineWinegrape[];
}
