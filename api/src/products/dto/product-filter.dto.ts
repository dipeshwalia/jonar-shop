import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GetProductsFilterDto {
  @ApiProperty()
  @IsNumber()
  take: number;

  @ApiProperty()
  @IsNumber()
  skip: number;
}
