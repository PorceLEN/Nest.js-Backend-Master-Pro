import {
  Controller,
  UseGuards,
  Post,
  Body,
  ValidationPipe,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Roles } from '../../common/enums/roles/roles.decorator';
import { CustomerType } from '../../common/enums/roles/customer-type.enum';
import { NotLoggedGuard } from '../auth/guards/NotLogged.guard';
import { AdminGuard } from '../../common/enums/roles/admin.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteResult } from 'typeorm';
import { UpdateResult } from 'typeorm/browser';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':id')
  getCategory(@Param('id') id: number): Promise<Category> {
    return this.categoryService.get(id);
  }

  @Get()
  getAllCategory(): Promise<Category[]> {
    return this.categoryService.getAll();
  }

  @UseGuards(NotLoggedGuard, AdminGuard)
  @Roles(CustomerType.admin)
  @Post()
  create(
    @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createAndSave(createCategoryDto);
  }

  @Patch(':id')
  updateCategory(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number): Promise<DeleteResult> {
    return this.categoryService.delete(id);
  }
}
