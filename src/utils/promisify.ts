import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { exec } from 'child_process';
import { Session } from 'express-session';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AsyncUtilsService {
  // Filesystem
  readFile = promisify(fs.readFile);
  writeFile = promisify(fs.writeFile);

  // Child process
  exec = promisify(exec);

  // JWT
  verifyJwt = promisify(jwt.verify);
  signJwt = promisify(jwt.sign);

  // Sessions
  destroySession(session: Session) {
    return promisify(session.destroy).bind(session)();
  }

  logoutUser(req: Request, user: User) {
    return promisify(req.logout).bind(req)(user);
  }

  login(req: Request, user: User) {
    return promisify(req.login).bind(req)(user);
  }
}
