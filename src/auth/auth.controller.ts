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
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalAuthGuard } from './LocalAuth.guard';
import type { Request, Response } from 'express';
import { AsyncUtilsService } from 'src/utils/promisify';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly asyncUtilsService: AsyncUtilsService,
  ) {}

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
  async login(@Req() req: Request & { user: User }) {
    await this.asyncUtilsService.login(req, req.user);

    return {
      user: req.user,
      userIsConnected: req.isAuthenticated(),
      session: req.session,
    };
  }

  @Delete('logout')
  async logout(@Req() req: Request & { user: User }, @Res() res: Response) {
    await this.asyncUtilsService.logoutUser(req, req.user);

    await this.asyncUtilsService.destroySession(req.session);

    res.clearCookie('NESTJS_SESSION_ID');

    res.send({
      message: 'Vous vous êtes bien déconnecté',
      user: req.user,
      userIsNotConnected: req.isUnauthenticated(),
      session: req.session,
    });
  }
}

// à revérifier