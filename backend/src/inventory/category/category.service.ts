/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoryDto } from './dto/find-category.dto';
import { ProductCategory } from 'src/entities/inventory/category.entity';
import { CATEGORY_MESSAGE } from 'src/common/enum';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly categoryRepo: Repository<ProductCategory>,
  ) {}

  async create(dto: CreateCategoryDto) {
    const category = this.categoryRepo.create(dto);
    const saved = await this.categoryRepo.save(category);

    return {
      message: CATEGORY_MESSAGE.CREATE_SUCCESS,
      data: saved,
    };
  }

  async findAll(query: FindCategoryDto) {
    const {
      page = 1,
      limit = 10,
      q,
      name,
      sortBy = 'createAt',
      order = 'DESC',
    } = query;

    const where: any = {};

    if (name) {
      where.name = ILike(`%${name}%`);
    }

    if (q) {
      where.name = ILike(`%${q}%`);
    }

    const [items, totalItems] = await this.categoryRepo.findAndCount({
      where,
      take: limit,
      skip: (page - 1) * limit,
      order: {
        [sortBy]: order,
      },
    });

    return {
      message: CATEGORY_MESSAGE.FIND_SUCCESS,
      data: items,
      meta: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  }

  async findById(id: string) {
    const category = await this.categoryRepo.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(CATEGORY_MESSAGE.NOT_FOUND);
    }

    return {
      message: CATEGORY_MESSAGE.FIND_ONE_SUCCESS,
      data: category,
    };
  }

  async update(id: string, dto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(CATEGORY_MESSAGE.NOT_FOUND);
    }

    Object.assign(category, dto);

    const updated = await this.categoryRepo.save(category);

    return {
      message: CATEGORY_MESSAGE.UPDATE_SUCCESS,
      data: updated,
    };
  }

  async delete(id: string) {
    const result = await this.categoryRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(CATEGORY_MESSAGE.NOT_FOUND);
    }

    return {
      message: CATEGORY_MESSAGE.DELETE_SUCCESS,
      data: { id },
    };
  }
}
