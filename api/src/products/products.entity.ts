import { Category } from 'src/categories/categories.entity';
import { Order } from 'src/orders/orders.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column()
  sku: number;

  @Column()
  count: number;

  @OneToMany((_type) => Order, (order) => order.product)
  order: Order;

  @ManyToMany((_type) => Category, (category) => category.product, { eager: false, cascade: true })
  @JoinTable({ name: 'product_categories' })
  category: Category[];
}
