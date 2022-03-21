import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('all', { each: true })
  category: any[];
}
