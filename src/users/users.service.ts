import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegisterModel } from './interfaces/UserRegisterModel';
import { UserRegisterSecure } from './interfaces/UserRegisterSecure';
import { UserLoginModel } from './interfaces/UserLoginModel';
import { User } from './entities/user.entity';
import { PasswordService } from 'src/password/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(userRegister: UserRegisterModel): Promise<User> {
    const pass = await this.passwordService.hash(userRegister.password);
    const { password, ...userWithoutPassword } = userRegister;

    const userSecuring: UserRegisterSecure = {
      password: pass,
      ...userWithoutPassword,
    };

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

  async findByEmail(userAccount: UserLoginModel): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      email: userAccount.email,
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé !');
    }

    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé !');
    }

    return user;
  }

  async existMail(userEmail: string): Promise<boolean> {
    return this.usersRepository.exists({
      where: { email: userEmail },
    });
  }
}
