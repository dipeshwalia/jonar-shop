import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty()
  username: number;

  @IsNotEmpty()
  orders: number;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  product: any;
  user: any;
}
