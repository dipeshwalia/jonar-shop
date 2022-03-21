import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
@ApiTags('Orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  getOrders(): Promise<Order[]> {
    return this.orderService.getOrders()
  }

  @Post()
  createTask(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<any[]> {

    return this.orderService.createOrder(createOrderDto, user);
  }
}
