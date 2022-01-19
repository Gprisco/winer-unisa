import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Role } from './role.entity';

@Entity('a_user')
export class User {
  @PrimaryGeneratedColumn('increment')
  userID: number;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'a_user_role',
    joinColumn: { name: 'userID', referencedColumnName: 'userID' },
    inverseJoinColumn: { name: 'roleID', referencedColumnName: 'roleID' },
  })
  roles: Role[];
}
