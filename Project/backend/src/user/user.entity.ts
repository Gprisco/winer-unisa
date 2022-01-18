import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('a_user')
export class User {
  @PrimaryGeneratedColumn('increment')
  userID: number;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;
}
