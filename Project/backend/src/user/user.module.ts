import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HasherModule } from 'src/hasher/hasher.module';
import { HasherService } from 'src/hasher/hasher.service';
import { User } from 'src/user/user.entity';
import { Role } from './role.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), HasherModule],
  providers: [UserService, HasherService],
  exports: [TypeOrmModule.forFeature([User, Role]), UserService, HasherService],
})
export class UserModule {}
