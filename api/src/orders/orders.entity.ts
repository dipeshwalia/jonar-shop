import { User } from 'src/users/user.entity';
import { Product } from 'src/products/products.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
// import {User} from '../../auth/entity/user.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subTotal: number;

  @Column()
  discount: number;

  @Column()
  item_count: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((_type) => Product, (product) => product.order, {cascade: true})
  product: Product;
  
  @ManyToOne((_type) => User, (user) => user.orders, {cascade: true})
  user: User;
}
