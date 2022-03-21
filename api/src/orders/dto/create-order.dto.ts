import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty()
  subTotal: number;

  @ApiProperty()
  @IsNotEmpty()
  discount: number;

  @ApiProperty()
  item_count: number;

  @ApiProperty()
  @IsNotEmpty()
  sku: number;

  @ApiProperty()
  @IsNotEmpty()
  product_id: any;

  product: any;
  user: any;
}
