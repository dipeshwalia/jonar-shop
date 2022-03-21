import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from 'src/orders/orders.entity';
import { RoleType } from 'src/auth/role.enum';
import { Exclude } from 'class-transformer';

// keeping this simple for now, ideally address, profile would be another entity, first_name, last_name, billing postal code, etc.
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  address: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    array: true,
    default: [RoleType.CUSTOMER],
  })
  role: RoleType;

  @OneToMany((_type) => Order, (order) => order.user, { eager: true })
  orders: Order[];
}
