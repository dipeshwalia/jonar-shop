import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateProductCountDto {
  @IsNotEmpty()
  @ApiProperty()
  count: number;
}
