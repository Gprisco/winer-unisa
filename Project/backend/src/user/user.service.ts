import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../auth/dto/CreateUser.dto';
import { HasherService } from '../hasher/hasher.service';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { PlatformRole, Role } from './role.entity';

export interface GetUserResponse {
  success: boolean;
  user?: User;
  error?: Error;
}

export interface CreateUserResponse {
  success: boolean;
  user?: User;
  error?: Error;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private hasherService: HasherService,
  ) {}

  async checkUserPassword(user: User, plainTextPassword: string) {
    return await this.hasherService.compare(plainTextPassword, user.password);
  }

  async getUserByEmail(email: string): Promise<GetUserResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        relations: ['roles'],
      });

      if (!user) return { success: false };

      return { success: true, user };
    } catch (error) {
      return { success: false, error };
    }
  }

  async createUser(user: CreateUserDto): Promise<CreateUserResponse> {
    try {
      const foundUser = await this.userRepository.findOne({
        email: user.email,
      });

      if (foundUser) throw new BadRequestException('Email già esistente');

      const hash = await this.hasherService.hash(user.password);

      const createdUser = this.userRepository.create({
        email: user.email,
        password: hash,
      });

      const roles = await this.roleRepository.find();

      const defaultRoles = roles.filter(
        (role) => role.roleName === PlatformRole.DEF,
      );
      const managerRoles = roles.filter(
        (role) => role.roleName === PlatformRole.MANAGER,
      );

      let defaultRole = defaultRoles.length > 0 ? defaultRoles[0] : null;
      let managerRole = managerRoles.length > 0 ? managerRoles[0] : null;

      if (!defaultRole)
        defaultRole = this.roleRepository.create({
          roleName: PlatformRole.DEF,
          roleDescription: 'This user can use Winer',
        });

      if (!managerRole)
        managerRole = this.roleRepository.create({
          roleName: PlatformRole.MANAGER,
          roleDescription: 'This user can manage wine related data',
        });

      try {
        await this.roleRepository.save([defaultRole, managerRole]);
      } catch (error) {}

      createdUser.roles = [defaultRole];

      const admin = await this.userRepository
        .createQueryBuilder('admin')
        .innerJoin('a_user_role', 'userRole', 'userRole.roleID = :roleID', {
          roleID: managerRole.roleID,
        })
        .getOne();

      if (!admin) createdUser.roles.push(managerRole);

      await this.userRepository.save(createdUser);

      return { success: true, user: createdUser };
    } catch (error) {
      throw error;
    }
  }
}
