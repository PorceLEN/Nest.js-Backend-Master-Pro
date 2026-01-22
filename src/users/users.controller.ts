import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserRegisterResponse } from './interfaces/UserRegisterResponse';
import type { UserRegisterModel } from './interfaces/UserRegisterModel';
import type { UserLoginResponse } from './interfaces/UserLoginResponse';
import type { UserLoginModel } from './interfaces/UserLoginModel';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() user: UserRegisterModel,
  ): Promise<UserRegisterResponse> {
    const theMailIsAlreadyExist = await this.usersService.existMail(user.email);

    if (theMailIsAlreadyExist) {
      throw new ConflictException(
        "L'adresse email que vous avez entré existe déjà !",
      );
    }

    return {
      user: await this.usersService.create(user),
    };
  }

  @Post('login')
  async login(@Body() user: UserLoginModel): Promise<UserLoginResponse> {
    const theAccountExist = await this.usersService.existUserAccount(user);

    if (theAccountExist) {
      return {
        email: user.email,
      };
    }

    throw new UnauthorizedException(
      "L'adresse email ou le mot de passe ne correspond pas !",
    );
  }
}
