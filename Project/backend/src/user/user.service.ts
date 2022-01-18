import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dto/createUser.dto';
import { HasherService } from 'src/hasher/hasher.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

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
    private hasherService: HasherService,
  ) {}

  async checkUserPassword(user: User, plainTextPassword: string) {
    return await this.hasherService.compare(plainTextPassword, user.password);
  }

  async getUserByEmail(email: string): Promise<GetUserResponse> {
    try {
      const user = await this.userRepository.find({
        where: { email },
        take: 1,
      });

      if (user.length > 0) return { success: true, user: user[0] };

      return { success: false };
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
      await this.userRepository.save(createdUser);

      return { success: true, user: createdUser };
    } catch (error) {
      return { success: false, error };
    }
  }
}
