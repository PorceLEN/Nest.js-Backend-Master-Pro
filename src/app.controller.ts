import {
  Controller,
  Request as Req,
  Post,
  UseGuards,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import type { Request } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException('Erreur lors de la connexion !');
    }

    req.login(req.user, (err) => {
      if (err) {
        throw new InternalServerErrorException('Login failed');
      }

      return req.user;
    });
  }     // erreur return

  @UseGuards(LocalAuthGuard)
  @Post('auth/logout')
  async logout(@Req() req: Request) {
    req.logout({ keepSessionInfo: false }, (err) => {
      if (err) {
        throw new InternalServerErrorException('Logout failed');
      }

      console.log(req.isAuthenticated?.());
    });

    return req.session;
  }
}
