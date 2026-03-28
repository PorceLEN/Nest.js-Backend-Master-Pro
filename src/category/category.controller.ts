import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Roles } from 'src/common/enums/roles/roles.decorator';
import { CustomerType } from 'src/common/enums/roles/customer-type.enum';
import { NotLoggedGuard } from 'src/auth/guards/NotLogged.guard';
import { RolesGuard } from 'src/common/enums/roles/roles.guard';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(NotLoggedGuard, RolesGuard)
  @Roles(CustomerType.Admin)
  @Post()
  create(@Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createAndSave(createCategoryDto);
  }
}
