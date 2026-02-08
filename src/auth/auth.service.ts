import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { PasswordService } from 'src/password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  async passwordMatching(password: string, passwordDb: string): Promise<boolean> {
    return await this.passwordService.match(password, passwordDb);
  }
}
