import { Injectable, Logger } from '@nestjs/common';
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
      const hash = await this.hasherService.hash(user.password);

      const createdUser = this.userRepository.create({
        email: user.email,
        password: hash,
      });

      let defaultRole = await this.roleRepository.findOne({
        where: { roleName: PlatformRole.DEF },
      });

      if (!defaultRole) {
        defaultRole = this.roleRepository.create({
          roleName: PlatformRole.DEF,
          roleDescription: '',
        });

        await this.roleRepository.save(defaultRole);
      }

      createdUser.roles = [defaultRole];

      await this.userRepository.save(createdUser);

      return { success: true, user: createdUser };
    } catch (error) {
      Logger.error(error);
      return { success: false, error };
    }
  }
}
