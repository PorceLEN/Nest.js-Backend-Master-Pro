import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {

  @IsString()
  name: string;

  @IsString()
  denomination: string;

  @IsNumber()
  price: number;

}
