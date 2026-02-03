import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PasswordService } from 'src/password/password.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(userRegister: CreateUserDto): Promise<User> {
    const pass = await this.passwordService.hash(userRegister.password);
    const { password, ...userWithoutPassword } = userRegister;

    const userSecuring: CreateUserDto = {
      password: pass,
      ...userWithoutPassword,
    };

    const user = this.usersRepository.create(userSecuring);
    await this.usersRepository.save(user);

    return user;
  }

  async existUserAccount(user: User): Promise<boolean> {
    return this.usersRepository.exists({
      where: {
        email: user.email,
      },
    });
  }

  async findById(id: number): Promise<User> {
    const userSearch = await this.usersRepository.findOneBy({
      id,
    });

    if (!userSearch) {
      throw new NotFoundException('Utilisateur non trouvé !');
    }

    return userSearch;
  }

  async existMail(userEmail: string): Promise<boolean> {
    return this.usersRepository.exists({
      where: { email: userEmail },
    });
  }
}
