import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { PasswordService } from '../password/password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { LocalStrategy } from './LocalStrategy.passport';
import { SessionSerializer } from './serialize/serialize.service';
import { PromisifyService } from '../../promisify/PromisifyService';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, UsersService, LocalStrategy, SessionSerializer, PromisifyService],
})
export class AuthModule {}
