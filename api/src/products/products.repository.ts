import { User } from '../users/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Product } from './products.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/product-filter.dto';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  private logger = new Logger('ProductsRepository', {});

  async createProduct(createProductDto: CreateProductDto): Promise<any> {
    const { name, description, sku, count, category, price } = createProductDto;

    const product = this.create({
      name,
      description,
      sku,
      count,
      price,
      category: category.map((c) => ({
        id: c,
      })),
    });

    await this.save(product);
    return product;
  }

  async getProducts(
    filterDto: GetProductsFilterDto,
  ): Promise<{ data: Product[]; count: number }> {
    const query = this.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .skip(filterDto.skip)
      .take(filterDto.take);
      
    const count = await this.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .getCount();

    try {
      const products = await query.getMany();
      return { data: products, count };
    } catch (error) {
      this.logger.error(`Failed to get products`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getProduct(id: string): Promise<Product> {
    const query = this.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.id = :id', { id });

    try {
      const product = await query.getOne();
      return product;
    } catch (error) {
      this.logger.error(`Failed to get product id "${id}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
