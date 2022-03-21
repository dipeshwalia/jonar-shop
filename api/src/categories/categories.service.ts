import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private categoryRepository: CategoriesRepository,
  ) {}

  createCategory(createCategoryDto: CreateCategoryDto): Promise<any> {
    return this.categoryRepository.createCategory(createCategoryDto);
  }
}
