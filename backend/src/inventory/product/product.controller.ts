import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Post()
  addProduct(@Body() body: CreateProductDto) {
    return this.productService.addProduct(body);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productService.updateProduct(id, body);
  }

  @Patch(':id/cancel')
  cancelProduct(@Param('id') id: string) {
    return this.productService.cancelProduct(id);
  }

  @Patch(':id/activate')
  activateProduct(@Param('id') id: string) {
    return this.productService.activateProduct(id);
  }

  @Get('search')
  searchProducts(@Query() query: ProductQueryDto) {
    return this.productService.searchProducts(query);
  }
}
