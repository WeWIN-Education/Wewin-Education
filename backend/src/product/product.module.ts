import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from '../entities/inventory/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule, CategoryModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
