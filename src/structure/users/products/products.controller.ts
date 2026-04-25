import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Param, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { NumericType, UpdateResult } from 'typeorm/browser';
import { UpdateProductDto } from './dto/update-product.dto';
import { AdminGuard } from '../../../common/enums/roles/admin.guard';
import { Roles } from '../../../common/enums/roles/roles.decorator';
import { CustomerType } from '../../../common/enums/roles/customer-type.enum';
import { NotLoggedGuard } from '../../auth/guards/NotLogged.guard';
import { DeleteResult } from 'typeorm/browser';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // CRUD

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.getById(id);
  }

  @Get('category/:id')
  getAllProductsOfCategory(
    @Param('id') categoryId: number,
  ): Promise<Product[]> {
    return this.productsService.getAllProductsOfCategory(categoryId);
  }

  @UseGuards(NotLoggedGuard, AdminGuard)
  @Roles(CustomerType.admin)
  @Post()
  async create(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.productsService.delete(id);
  }
}
