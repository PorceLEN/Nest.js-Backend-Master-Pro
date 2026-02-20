import {
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
  Delete,
  Request as Req,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/')
  async getAuthSession(@Session() session: Record<string, any>) {
    return session;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    console.log(req.user);

    if (req.user) {
      throw new ConflictException('Vous êtes déjà connecté !');
    }

    return {
      message: 'Login successfully',
      user: req.user,
      session: req.session,
    };
  }

  @Delete('logout')
  async logout(@Req() req: Request) {
    // logout Passport
    await new Promise<void>((resolve, reject) => {
      req.logout((err) => (err ? reject(err) : resolve()));
    });

    // destroy session
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => (err ? reject(err) : resolve()));
    });

    return {
      message: 'Logged out successfully',
      user: req.user,
      session: req.session ?? 'empty',
    };
  }
}
