import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

export interface GetUserResponse {
  success: boolean;
  user?: User;
  error?: Error;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

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
}
