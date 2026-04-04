import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, user.id);
  }

  async deserializeUser(id: number, done: Function) {
    try {
      const user = await this.usersService.findById(id);
      done(null, user || null);
    } catch (err) {
      done(err, null);
    }
  }
}

// verif
