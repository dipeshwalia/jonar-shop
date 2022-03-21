import { Optional } from '@nestjs/common';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersFilterDto {
  @IsOptional()
  status?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false
  })
  search?: string;

  @IsNumber()
  take: number;

  @IsNumber()
  skip: number;
}
