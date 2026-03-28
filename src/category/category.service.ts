import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateResult } from 'typeorm/browser';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  createAndSave(category: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  async get(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      id,
    });

    console.log(category);

    if (!category) {
      throw new NotFoundException("Cette catégorie n'existe pas !");
    }

    return category;
  }

  update(
    @Param('id') id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateResult> {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.categoryRepository.delete(id);
  }
}
