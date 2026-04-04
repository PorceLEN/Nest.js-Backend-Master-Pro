import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PasswordService } from '../password/password.service';

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
    return this.passwordService.match(password, passwordDb);
  }
}
