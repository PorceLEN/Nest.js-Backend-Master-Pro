import { IsNumber, IsString } from 'class-validator';
import { Product } from '../entities/product.entity';

export class CreateProductDto {

  @IsString()
  name: string;

  @IsNumber()
  price: number;
}


