import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Param, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateResult } from 'typeorm/browser';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuard } from 'src/common/enums/roles/roles.guard';
import { Roles } from 'src/common/enums/roles/roles.decorator';
import { CustomerType } from 'src/common/enums/roles/customer-type.enum';
import { NotLoggedGuard } from 'src/auth/guards/NotLogged.guard';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.get(id);
  }

  @UseGuards(NotLoggedGuard, RolesGuard)
  @Roles(CustomerType.Admin)
  @Post()
  async create(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.createAndSave(createProductDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateProductDto: UpdateProductDto,
  ) {
      
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
  }
}

// go to create all