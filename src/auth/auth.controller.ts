import {
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
  Request as Req,
  Response as Res,
  HttpCode,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './AuthLocal.guard';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Get('/')
  async getAuthSession(
    @Session() session: Record<string, any>,
    @Req() req: Request,
  ) {
    return {
      user: req.user,
      session: req.session,
      cookie: { sessionID: req.sessionID, cookie: req.cookies },
    };
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      if (!req.user) {
        throw new NotFoundException('Utilisateur inexistant');
      }

      req.login(req.user, (err) => {
        if (err) {
          console.error('Erreur login', err);
          return reject(err); 
        }
        
        resolve({
          user: req.user,
          session: req.session,
          cookie: req.cookies,
        });
      });
    });
  }

  @Delete('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    res.clearCookie('NESTJS_SESSION_ID');

    return res.send({
      message: 'Vous vous êtes bien déconnecté',
      session: req.session ?? 'empty',
      cookie: req.cookies ?? 'empty',
      user: req.user ?? 'empty',
    });
  }
}

// Remplacer les promises par la solution propre : promisify