import {
  Controller,
  Post,
  Body,
  ConflictException,
  NotFoundException,
  Get,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserRegisterResponse } from './interfaces/UserRegisterResponse';
import type { UserRegisterModel } from './interfaces/UserRegisterModel';
import type { UserLoginResponse } from './interfaces/UserLoginResponse';
import type { UserLoginModel } from './interfaces/UserLoginModel';
import { PasswordService } from 'src/password/password.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm/browser';
import { DeleteResult } from 'typeorm/browser';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

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
  async login(@Body() userEntry: UserLoginModel): Promise<UserLoginResponse> {
    const theAccountExist = await this.usersService.existUserAccount(userEntry);

    console.log(theAccountExist);

    if (!theAccountExist) {
      throw new NotFoundException('Email ou mot de passe incorrect !');
    }

    const user = await this.usersService.findByEmail(userEntry);

    const isPasswordMatching = await this.passwordService.match(
      userEntry.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new NotFoundException('Email ou mot de passe incorrect !');
    }

    return {
      email: userEntry.email,
    };
  }

  @Post('update')
  async update(@Body() { user }: { user: User }): Promise<UpdateResult> {
    return await this.usersRepository.update(user.id, user);
  }

  @Post('delete')
  async delete(@Body() { user }: { user: User }): Promise<DeleteResult> {
    return await this.usersRepository.delete(user.id);
  }

  @Get(':id')
  async findOne(@Param("id") id: number) {
    return await this.usersService.findById(id);
  }
}

// true format : {
//   "id": 1,
//   "optionToUpdate": {
//     "email": "test@mail.com"
//   }
// }
