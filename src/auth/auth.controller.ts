import { Controller, Post, Body, Get, Session, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpCode } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { NotFoundException } from '@nestjs/common';
import { PasswordService } from 'src/password/password.service';;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
  ) {}

  // @HttpCode(200)
  // @Post('login')
  // async login(@Body() user: User): Promise<User> {
  //       const theAccountExist = await this.usersService.existUserAccount(user);

  //   console.log(theAccountExist);

  //   if (!theAccountExist) {
  //     throw new NotFoundException('Email ou mot de passe incorrect !');
  //   }

  //   const userFind = await this.usersService.findById(user.id);

  //   const isPasswordMatching = await this.passwordService.match(
  //     user.password,
  //     userFind.password,
  //   );

  //   if (!isPasswordMatching) {
  //     throw new NotFoundException('Email ou mot de passe incorrect !');
  //   }

  //   return user;
  // }

  @HttpCode(200)
  @Post("login") 
  async login(@Request() req) {}


  @Get("/")
  async getAuthSession(@Session() session: Record<string, any>)  { 
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }
}

// voir pour cookies