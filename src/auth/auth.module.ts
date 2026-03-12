import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from 'src/password/password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { LocalStrategy } from './LocalStrategy.passport';
import { SerializeService } from './serialize/serialize.service';
import { AsyncUtilsService } from 'src/utils/promisify';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, UsersService, LocalStrategy, SerializeService, AsyncUtilsService],
})
export class AuthModule {}
