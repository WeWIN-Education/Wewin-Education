/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Category } from '../../entities/inventory/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoryDto } from './dto/find-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    const category = this.categoryRepo.create(dto);
    return this.categoryRepo.save(category);
  }

  async findAll(query: FindCategoryDto) {
    const where: any = {};

    if (query.q) {
      where.name = ILike(`%${query.q}%`);
    }

    if (query.active !== undefined) {
      where.isActive = query.active === 'true';
    }

    const items = await this.categoryRepo.find({
      where,
      order: { createAt: 'DESC' },
    });

    return items;
  }

  async findById(id: string) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.findById(id);
    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  async disable(id: string) {
    const category = await this.findById(id);
    category.isActive = false;
    return this.categoryRepo.save(category);
  }

  async active(id: string) {
    const category = await this.findById(id);
    category.isActive = true;
    return this.categoryRepo.save(category);
  }
}
