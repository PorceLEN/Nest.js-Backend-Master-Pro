import { Category } from '../../../category/entities/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  BeforeInsert,
  CreateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  priceHt: number;

  @Column({ nullable: true })
  tvaRate: number;

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

  @CreateDateColumn()
  createdDate: Date;

  @BeforeInsert()
  generateProductCode() {
    const productCodeGenerated = 'PROD-' + uuidv4().slice(0, 8).toUpperCase();

    this.productCode = productCodeGenerated;
  }
}
