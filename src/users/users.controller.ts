import {
  Controller,
  Post,
  Body,
  ConflictException,
  NotFoundException,
  Get,
  Param,
  Patch,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { PasswordService } from 'src/password/password.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm/browser';
import { DeleteResult } from 'typeorm/browser';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  @Post('create')
  async create(
    @Body() user: CreateUserDto, // a modif
  ): Promise<User> {
    const theMailIsAlreadyExist = await this.usersService.existMail(user.email);

    if (theMailIsAlreadyExist) {
      throw new ConflictException(
        "L'adresse email que vous avez entré existe déjà !",
      );
    }

    return await this.usersService.create(user);
  }

  @Post('login')
  async login(@Body() user: User): Promise<User> {
    const theAccountExist = await this.usersService.existUserAccount(user);
    
    if (!theAccountExist) {
      throw new NotFoundException('Email ou mot de passe incorrect !');
    }

    const userFound = await this.usersService.findById(user.id);

    const isPasswordMatching = await this.passwordService.match(
      user.password,
      userFound.password,
    );

    console.log(userFound, user);
    

    if (!isPasswordMatching) {
      throw new NotFoundException('Email ou mot de passe incorrect !');
    }
    
    return user;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.usersService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto, // à vérifier
  ): Promise<UpdateResult> {
    return await this.usersRepository.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
