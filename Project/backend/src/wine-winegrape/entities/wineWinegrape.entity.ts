import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Wine } from '../../wine/entities/wine.entity';
import { Winegrape } from '../../wine/entities/winegrape.entity';

@Entity({ name: 'w_wine_winegrape' })
export class WineWinegrape {
  @PrimaryColumn()
  winegrapeId: number;

  @PrimaryColumn()
  @Column({ name: 'wine' })
  winePK: string;

  @PrimaryColumn()
  vintage: number;

  @ManyToOne(() => Winegrape)
  @JoinColumn({ name: 'winegrapeId', referencedColumnName: 'winegrapeId' })
  winegrape: Winegrape;

  @ManyToOne(() => Wine, { cascade: ['update', 'remove'] })
  @JoinColumn([
    { name: 'wine', referencedColumnName: 'wine' },
    { name: 'vintage', referencedColumnName: 'vintage' },
  ])
  wine: Wine;

  @Column('int', { name: 'percentage' })
  percentage: number;
}
