import { Category } from '../../../category/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  priceHt: number;

  @Column({ nullable: true })
  tvaRate: number

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

  @Index({ unique: true })
  @Column()
  productCode: string;

  @BeforeInsert()
  generateCode() {

    const productCodeGenerated = 'PROD-' + uuidv4().slice(0, 8).toUpperCase();

    this.productCode = productCodeGenerated;
  }
}
