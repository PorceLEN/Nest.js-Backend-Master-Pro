import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productCode: number;

  @Column()
  name: string;

  @Column()
  denomination: string;

  @Column()
  price: number;
}
