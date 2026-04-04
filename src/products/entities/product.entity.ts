import { Category } from '../../category/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
  })
  category: Category;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  @Index({ unique: true })
  productCode: string;

  // @BeforeInsert()
  // generateProductCode() {
  //   this.productCode = 
  // }
}

// Créer un SKU 