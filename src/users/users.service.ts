import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegisterModel } from './interfaces/UserRegisterModel';
import { UserRegisterSecure } from './interfaces/UserRegisterSecure';
import { UserLoginModel } from './interfaces/UserLoginModel';
import { hashingPassword } from 'src/utils/hashingPassword';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(userRegister: UserRegisterModel): Promise<User> {
    const pass = await hashingPassword(userRegister.password);
    const { password, ...userWithoutPassword } = userRegister;

    const userSecuring: UserRegisterSecure = {
      password: pass,
      ...userWithoutPassword,
    };

    // console.log(userSecuring);

    const user = this.usersRepository.create(userSecuring);
    await this.usersRepository.save(user);

    return user;
  }

  async existUserAccount(userAccount: UserLoginModel): Promise<boolean> {
    return this.usersRepository.exists({
      where: {
        email: userAccount.email,
      },
    });
  }

  async passwordMatch(userAccount: UserLoginModel): Promise<boolean> {
    const userRepo = await this.usersRepository.findOneBy({
      email: userAccount.email,
    });

    if (!userRepo) {
      throw new NotFoundException(
        'Utilisateur non trouvé dans le repository !',
      );
    }

    return await bcrypt.compare(userAccount.password, userRepo.password);
  }

  async existMail(userEmail: string): Promise<boolean> {
    return this.usersRepository.exists({
      where: { email: userEmail },
    });
  }
}
