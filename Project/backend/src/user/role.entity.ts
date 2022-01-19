import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PlatformRole {
  DEF = 'DEF',
  MANAGER = 'MANAGER',
}

@Entity('a_role')
export class Role {
  @PrimaryGeneratedColumn('increment')
  roleID: number;

  @Column('varchar')
  roleName: string;

  @Column('varchar')
  roleDescription: string;
}
