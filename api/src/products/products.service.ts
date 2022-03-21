import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsRepository } from './products.repository';
import { Product } from './products.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productRepository: ProductsRepository,
  ) {}

  async getProductById(id: string): Promise<Product> {
    const found = await this.productRepository.getProduct(id);

    if (!found) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return found;
  }

  createProduct(createProductDto: CreateProductDto): Promise<any> {
    return this.productRepository.createProduct(createProductDto);
  }

  getProducts(filterDto): Promise<{data: Product[], count: number}> {
    return this.productRepository.getProducts(filterDto);
  }

  async updateProduct(id, updateProductDto: UpdateProductDto): Promise<any> {
    const product = await this.getProductById(id);
    const { description, category = [] } = updateProductDto;

    return this.productRepository.save({
      ...product,
      description: description ? description : product.description,
      category:
        category.length > 0
          ? category.map((c) => ({
              id: c,
            }))
          : product.category,
    });
  }

  async updateProductCount(
    id: string,
    updateProductCountDto,
  ): Promise<Product> {
    const product = await this.getProductById(id);

    product.count = updateProductCountDto.count;

    return this.productRepository.save(product);
  }
}
