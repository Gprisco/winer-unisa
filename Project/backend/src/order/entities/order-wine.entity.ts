import { Wine } from 'src/wine/entities/wine.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('p_order_wine')
export class OrderWine {
  @PrimaryColumn({ name: 'wine' })
  winePK: string;

  @PrimaryColumn()
  vintage: number;

  @PrimaryColumn()
  orderID: number;

  @Column('int')
  quantity: number;

  @Column('float')
  price: number;

  @ManyToOne(() => Order, { cascade: ['update', 'remove'] })
  @JoinColumn({ name: 'orderID', referencedColumnName: 'orderID' })
  order: Order;

  @ManyToOne(() => Wine, { cascade: ['update', 'remove'] })
  @JoinColumn([
    { name: 'wine', referencedColumnName: 'wine' },
    { name: 'vintage', referencedColumnName: 'vintage' },
  ])
  wine: Wine;
}
