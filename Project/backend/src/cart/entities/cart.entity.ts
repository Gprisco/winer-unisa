import { Wine } from 'src/wine/entities/wine.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('c_cart_item')
export class CartItem {
  @PrimaryColumn({ name: 'wine' })
  winePK: string;

  @PrimaryColumn()
  vintage: number;

  @PrimaryColumn()
  userID: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Wine, { cascade: ['update', 'remove'] })
  @JoinColumn([
    { name: 'wine', referencedColumnName: 'wine' },
    { name: 'vintage', referencedColumnName: 'vintage' },
  ])
  wine: Wine;
}
