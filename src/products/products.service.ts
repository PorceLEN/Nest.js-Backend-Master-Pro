import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateResult } from 'typeorm/browser';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  createAndSave(createProductDto: CreateProductDto): Promise<Product> {
    // const newProduct = this.productsRepository.create(createProductDto);
    // return this.productsRepository.save(newProduct);
    const newProduct = this.productsRepository.create({
      ...createProductDto,
      category: { id: createProductDto.categoryId },
    });

    return this.productsRepository.save(newProduct);
  }

  async get(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException("Ce produit n'existe pas !");
    }

    return product;
  }

  getAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  getAllProductsOfCategory(categoryId: number): Promise<Product[]> {
    return this.productsRepository.find({
      where: { category: { id: categoryId } },
    });
  }

  update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    return this.productsRepository.update(id, updateProductDto);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.productsRepository.delete(id);
  }
}

// CRUD => CREATE / READ / Update / Delete
