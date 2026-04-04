import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { exec } from 'child_process';
import { Session } from 'express-session';
import { Request } from 'express';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AsyncUtilsService {
  // Filesystem
  private readonly readFile = promisify(fs.readFile);
  writeFile = promisify(fs.writeFile);

  // Child process
  private readonly exec = promisify(exec);

  // JWT
  private readonly verifyJwt = promisify(jwt.verify);
  private readonly signJwt = promisify(jwt.sign);

  constructor() {}

  // Sessions
  async destroySession(session: Session): Promise<Session> {
    return promisify(session.destroy).bind(session)();
  }

  async logoutUser(req: Request, user: User): Promise<void> {
    return promisify(req.logout).bind(req)(user);
  }

  async login(req: Request, user: User): Promise<void> {
    return promisify(req.login).bind(req)(user);
  }
}

// à vérifier
