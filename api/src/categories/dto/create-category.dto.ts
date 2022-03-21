import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  id: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

}
