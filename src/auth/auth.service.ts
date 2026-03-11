import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from 'src/password/password.service';
import { Request as Req } from '@nestjs/common';
import type { Request } from 'express';
import { SessionData } from 'express-session';
import { LocalAuthGuard } from './AuthLocal.guard';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  async passwordMatching(
    password: string,
    passwordDb: string,
  ): Promise<boolean> {
    return await this.passwordService.match(password, passwordDb);
  }
}
