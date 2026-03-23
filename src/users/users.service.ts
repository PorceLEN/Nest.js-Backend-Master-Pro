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

  async createAndSave(userRegister: CreateUserDto): Promise<User> {
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

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({
      id,
    });

    if (!user) {
      throw new NotFoundException("Cet utilisateur n'existe pas !");
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    // !!!
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException("Cet utilisateur n'existe pas !");
    }

    return user;
  }

  existMail(email: string): Promise<boolean> {
    return this.usersRepository.exists({
      where: { email },
    });
  }

  theAccountExist(user: CreateUserDto): Promise<boolean> {
    return this.usersRepository.exists({
      where: { email: user.email },
    });
  }
}

// à vérifier
