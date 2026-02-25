import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Product')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  searchProducts(@Query() query: ProductQueryDto) {
    return this.productService.searchProducts(query);
  }

  @Post()
  addProduct(@Body() body: CreateProductDto) {
    return this.productService.addProduct(body);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productService.updateProduct(id, body);
  }

  @Put(':id/cancel')
  cancelProduct(@Param('id') id: string) {
    return this.productService.cancelProduct(id);
  }

  @Put(':id/activate')
  activateProduct(@Param('id') id: string) {
    return this.productService.activateProduct(id);
  }

  @Get(':id')
  getById(
    @Param('id') id: string,
    @Query('includeCancelled') includeCancelled?: string,
  ) {
    return this.productService.getProductById(id, includeCancelled === 'true');
  }
}
