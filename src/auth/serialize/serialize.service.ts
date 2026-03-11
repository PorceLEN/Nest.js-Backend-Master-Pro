import { Injectable, OnModuleInit } from '@nestjs/common';
import passport from 'passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SerializeService implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  onModuleInit() {
    passport.serializeUser((user: any, done) => {
      if (!user || !user.id) return done(new Error('Invalid user'), null);
      done(null, user.id);
    });

    passport.deserializeUser(async (id: number, done) => {
      try {
        const user = await this.usersService.findById(id);
        if (!user) return done(new Error('User not found'), null);
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    });
  }
}

// verif
