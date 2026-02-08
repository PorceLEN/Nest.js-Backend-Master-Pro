import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Param, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteResult } from 'typeorm/browser';
import { UpdateResult } from 'typeorm/browser';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  @Post('create')
  async create(
    @Body(new ValidationPipe()) productDto: CreateProductDto,
  ): Promise<Product> {
    const newProduct = this.productsRepository.create(productDto);
    return await this.productsRepository.save(newProduct);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({
      productCode: id,
    });

    if (!product) {
      throw new NotFoundException("Ce produit n'existe pas !");
    }

    return product;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) productDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    const product = await this.productsRepository.update(id, productDto);

    if (!product.affected) {
      throw new NotFoundException("Le produit que vous essayez de modifier n'existe pas !")
    }

    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    const product = await this.productsRepository.delete(id);

    if (!product.affected) {
      throw new NotFoundException("Le produit que vous essayez de supprimer n'existe pas !");
    }

    return product;
  }
}

// go to refacto