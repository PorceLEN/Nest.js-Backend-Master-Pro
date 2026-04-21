import {
  Controller,
  Post,
  Body,
  ConflictException,
  Get,
  Param,
  Patch,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateResult } from 'typeorm/browser';
import { DeleteResult } from 'typeorm/browser';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // auth.controller.ts already use ValidationPipe() !!!
  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    const theMailIsAlreadyExist = await this.usersService.existMail(user.email);

    if (theMailIsAlreadyExist) {
      throw new ConflictException(
        "L'adresse email que vous avez entré existe déjà !",
      );
    }

    return this.usersService.createAndSave(user);
  }

  @Get(':id')
  findOneById(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.usersService.delete(id);
  }
}
