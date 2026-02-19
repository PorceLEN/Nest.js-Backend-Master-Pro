import {
  Controller,
  Request as Req,
  Post,
  UseGuards,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import type { Request } from 'express';
import { User } from './users/entities/user.entity';
import { InternalServerErrorException } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}
}
