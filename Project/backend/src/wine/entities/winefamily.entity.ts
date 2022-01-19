import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Region } from './region.entity';
import { Winecolor } from './winecolor.entity';
import { Winedenom } from './winedenom.entity';
import { Winetype } from './winetype.entity';

@Entity({ name: 'w_winefamily' })
export class Winefamily {
  @PrimaryGeneratedColumn('increment')
  winefamilyId: number;

  @Column('varchar')
  winefamily: string;

  @ManyToOne(() => Winedenom)
  @JoinColumn({ name: 'winedenomId', referencedColumnName: 'winedenomId' })
  winedenom: Winedenom;

  @ManyToOne(() => Winecolor)
  @JoinColumn({ name: 'winecolorId', referencedColumnName: 'winecolorId' })
  winecolor: Winecolor;

  @ManyToOne(() => Winetype)
  @JoinColumn({ name: 'winetypeId', referencedColumnName: 'winetypeId' })
  winetype: Winetype;

  @ManyToOne(() => Region)
  @JoinColumn({ name: 'regionId', referencedColumnName: 'regionId' })
  region: Region;
}
