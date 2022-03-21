import { EntityRepository, Repository } from 'typeorm';
import { Category } from './categories.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<any> {
    const { name, description } = createCategoryDto;

    const category = this.create({
      name,
      description,
    });

    await this.save(category);
  }
}
