import {
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
  Delete,
  NotFoundException,
  Request as Req,
  InternalServerErrorException,
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
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    if (!req.user) {
      throw new NotFoundException("Cet utilisateur n'existe pas !");
    }

    req.login(req.user, (err) => {
      console.log('Erreur lors du login :', err);
    });

    return {
      user: req.user,
      session: req.session,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Delete('logout')
  logout(@Req() req: Request) {
    if (!req.session) {
      throw new InternalServerErrorException('Aucune session existante !');
    }

    req.logout((err) => {
      console.log('Erreur lors de la déconnexion :', err);
      return;
    });
    // req.session.destroy((err) => {
    //   console.log("Erreur lors de la destruction de session :", err);
    //   return;
    // });

    console.log(req.session);
    return;
  }
}

// voir pour cookies
// Pourquoi destroy bug
