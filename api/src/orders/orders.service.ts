import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { ProductsService } from 'src/products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';
import { Order } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    private productService: ProductsService,
  ) {}

  getOrders(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['product', 'user'],
      order: {
        created_at: 'DESC',
      },
      // just for illustration
      take: 5,
    });
  }

  async createOrder(createOrderDto: CreateOrderDto, user: User): Promise<any> {
    const product = await this.productService.getProductById(
      createOrderDto.product_id,
    );

    if (product.count < createOrderDto.item_count) {
      throw new BadRequestException(
        `Product with ID "${product.id}" is out of stock`,
      );
    }

    createOrderDto.subTotal = product.price * createOrderDto.item_count;
    createOrderDto.product = product;
    createOrderDto.discount = 0;

    const order = await this.orderRepository.createOrder(createOrderDto, user);

    await this.productService.updateProductCount(product.id, {
      count: product.count - createOrderDto.item_count,
    });

    return order;
  }
}
