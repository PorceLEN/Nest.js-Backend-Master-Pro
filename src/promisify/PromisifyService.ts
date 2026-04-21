import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { Session } from 'express-session';
import { CustomRequest } from '../types/CustomRequest.type';

@Injectable()
export class PromisifyService {
  constructor() {}

  // don't touch this horrible service please

  destroySession(session: Session): Promise<Session> {
    return promisify(session.destroy).bind(session)()
  }

  logout(req: CustomRequest): Promise<void> {
    return promisify(req.logout).bind(req)();
  }

  login(req: CustomRequest): Promise<void> {
    return promisify(req.login).bind(req)(req.user);
  }
}
