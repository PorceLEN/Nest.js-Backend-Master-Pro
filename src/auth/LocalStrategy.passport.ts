import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {

    const user = await this.usersService.findByEmail(email);

    const isPasswordMatching = await this.authService.passwordMatching(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new NotFoundException("L'email ou le mot de passe est incorrect !");
    }

    return user;
  }
}
