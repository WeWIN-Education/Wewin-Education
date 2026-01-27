/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/inventory/category.entity';
import { CategoryQueryDto } from './dto/category-query.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  /* ================= CREATE ================= */
  async create(dto: CreateCategoryDto) {
    const existed = await this.categoryRepo.findOne({
      where: { name: dto.name },
    });

    if (existed) {
      throw new BadRequestException('Category name already exists');
    }

    const category = this.categoryRepo.create({
      name: dto.name,
    });
    return this.categoryRepo.save(category);
  }

  /* ================= GET ALL ================= */
  async findAll(query: CategoryQueryDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      order = 'DESC',
    } = query;

    const qb = this.categoryRepo.createQueryBuilder('category');

    if (search) {
      qb.andWhere('LOWER(category.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    const sortOrder: 'ASC' | 'DESC' = order === 'ASC' ? 'ASC' : 'DESC';

    qb.orderBy(`category.${sortBy}`, sortOrder);
    qb.skip((page - 1) * limit).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /* ================= GET ONE ================= */
  async findById(id: string) {
    const category = await this.categoryRepo.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  /* ================= UPDATE ================= */
  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.findById(id);
    const { name } = dto;

    if (name && name !== category.name) {
      const existed = await this.categoryRepo.findOne({
        where: { name },
      });

      if (existed) {
        throw new BadRequestException('Category name already exists');
      }
    }

    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  /* ================= DELETE ================= */
  async remove(id: string) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.products?.length) {
      throw new BadRequestException('Cannot delete category that has products');
    }

    await this.categoryRepo.remove(category);
    return { message: 'Category deleted successfully' };
  }
}
