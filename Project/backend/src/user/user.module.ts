import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HasherModule } from '../hasher/hasher.module';
import { User } from '../user/user.entity';
import { Role } from './role.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), HasherModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
