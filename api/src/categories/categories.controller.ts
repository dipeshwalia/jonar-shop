import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
@ApiTags('Product Categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Post()
  createProduct(@Body() createCategoryDto: CreateCategoryDto): Promise<any> {
    return this.categoryService.createCategory(createCategoryDto);
  }
}
