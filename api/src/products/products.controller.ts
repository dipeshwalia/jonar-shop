import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/product-filter.dto';
import { UpdateProductCountDto } from './dto/update-product-count.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  getProducts(
    @Query() filterDto: GetProductsFilterDto,
  ): Promise<{ data: Product[]; count: number }> {
    return this.productService.getProducts(filterDto);
  }

  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<CreateProductDto> {
    return this.productService.createProduct(createProductDto);
  }

  @Get('/:id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Put('/:id')
  updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Patch('/:id/count')
  updateProductCount(
    @Param('id') id: string,
    @Body() updateProductCountDto: UpdateProductCountDto,
  ): Promise<Product> {
    return this.productService.updateProductCount(id, updateProductCountDto);
  }
}
