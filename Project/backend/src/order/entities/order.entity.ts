import { User } from '../../user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderWine } from './order-wine.entity';

@Entity('p_order')
export class Order {
  @PrimaryGeneratedColumn('increment')
  orderID: number;

  @Column('datetime')
  createdAt: Date;

  @Column('int')
  userID: number;

  @Column('boolean')
  confirmed: boolean;

  @Column('varchar')
  address: string;

  @ManyToOne(() => User, { cascade: ['update', 'remove'] })
  @JoinColumn({ name: 'userID', referencedColumnName: 'userID' })
  user: User;

  @OneToMany(() => OrderWine, (orderWine) => orderWine.order)
  @JoinColumn({ name: 'orderID', referencedColumnName: 'orderID' })
  orderWine: OrderWine[];
}
