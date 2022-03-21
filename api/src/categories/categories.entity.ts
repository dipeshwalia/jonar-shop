import { Product } from 'src/products/products.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany((_type) => Product, (product) => product.category, { eager: false })
  @JoinTable({ name: 'product_categories' })
  product: Category[];
}
