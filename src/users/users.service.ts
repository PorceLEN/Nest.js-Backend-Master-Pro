import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRegisterModel } from './interfaces/UserRegisterModel';
import { UserRegisterSecure } from './interfaces/UserRegisterSecure';
import { UserLoginModel } from './interfaces/UserLoginModel';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(userRegister: UserRegisterModel): Promise<User> {

    
    console.log("PASSWORD :", userRegister.password);

    const salt = await bcrypt.genSalt(10);
    const hashingPassword = await bcrypt.hash(
      userRegister.password,
      salt,
    );

    console.log("SECURE PASSWORD :", hashingPassword);
    

    const { password, ...userWithoutPassword } = userRegister;

    const userSecuring: UserRegisterSecure = {
      password: hashingPassword,
      ...userWithoutPassword,
    };

    const user = this.usersRepository.create(userSecuring);
    return this.usersRepository.save(user);
  }

  async existUserAccount(userAccount: UserLoginModel): Promise<boolean> {
    return this.usersRepository.exists({
      where: {
        email: userAccount.email,
        password: userAccount.password,
      },
    });
  }

  async existMail(userEmail: string): Promise<boolean> {
    return this.usersRepository.exists({
      where: { email: userEmail },
    });
  }
}
