import { EntityRepository, Repository } from 'typeorm';
// import {Order} from '../entity/order.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Order } from './orders.entity';
import { User } from 'src/users/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  private logger = new Logger('OrderRepository');

  async createOrder(createOrderDto: CreateOrderDto, user: User): Promise<any> {
    const { discount = 0, subTotal, product, item_count } = createOrderDto;


    const order = this.create({
      discount,
      subTotal,
      product,
      user,
      item_count,
    });

    await this.save(order);

    return order;
  }
}
