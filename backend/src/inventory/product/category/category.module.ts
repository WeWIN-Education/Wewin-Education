import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ProductCategory } from 'src/entities/inventory/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
