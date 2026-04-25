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
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './guards/LocalAuth.guard';
import type { Response } from 'express';
import { PromisifyService } from '../promisify/promisify.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { GuestGuard } from './guards/Guest.guard';
import { NotLoggedGuard } from './guards/NotLogged.guard';
import { ConflictException } from '@nestjs/common';
import type { CustomRequest } from '../../types/CustomRequest.type';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly promisifyService: PromisifyService,
  ) {}

  @Get('/')
  async getAuthSession(
    @Session() session: Record<string, any>,
    @Req() req: CustomRequest,
  ) {
    return {
      user: req.user ?? "empty",
      session: req.session,
      cookie: { sessionID: req.sessionID, cookie: req.cookies },
    };
  }

  @Post('register')
  async register(@Body(new ValidationPipe()) user: CreateUserDto): Promise<CreateUserDto> {
    const userAlreadyExist = await this.usersService.theAccountExist(user);

    if (userAlreadyExist) {
      throw new ConflictException('Cet adresse email est déjà utilisé !');
    }

    return this.usersService.createAndSave(user);
  }
  
  @UseGuards(GuestGuard, LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Req() req: CustomRequest) {

    await this.promisifyService.login(req);

    return {
      user: req.user,
      userIsConnected: req.isAuthenticated(),
      session: req.session,
    };
  }

  @UseGuards(NotLoggedGuard)
  @Delete('logout')
  async logout(@Req() req: CustomRequest, @Res() res: Response) {
    await this.promisifyService.logout(req);

    res.clearCookie('NESTJS_SESSION_ID'); // remove cookies session

    res.send({
      message: 'Vous vous êtes bien déconnecté',
      user: req.user,
      userIsNotConnected: req.isUnauthenticated(),
      session: req.session,
    });
  }
}
