import { Category } from 'src/category/entities/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @Column({ default: false })
  rupture: boolean;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
  })
  category: Category;
}
