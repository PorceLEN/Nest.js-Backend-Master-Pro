import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { User } from 'src/users/entities/user.entity';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

declare module 'express' {
  interface Request {
    user?: User;
  }
}

// Retirer module express
