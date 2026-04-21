import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  constructor() {}

  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async match(notHashed: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(notHashed, hashed);
  }
}
