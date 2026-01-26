import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/inventory/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { BadRequestException } from '@nestjs/common';
import { PRODUCT_STATUS_ENUM } from '../../util/enum';
import { Brackets } from 'typeorm';
import { ProductQueryDto } from './dto/product-query.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async getProducts() {
    return this.productRepo.find();
  }

  async addProduct(data: Partial<Product>) {
    if (!data.code) {
      throw new BadRequestException('Product code is required');
    }

    const existed = await this.productRepo.findOne({
      where: { code: data.code },
    });

    if (existed) {
      throw new BadRequestException(
        `Product code "${data.code}" already exists`,
      );
    }

    const product = this.productRepo.create(data);
    const saved = await this.productRepo.save(product);

    return {
      message: 'Product created successfully',
      data: saved,
    };
  }

  async updateProduct(id: string, data: UpdateProductDto) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.status === PRODUCT_STATUS_ENUM.CANCELLED) {
      throw new BadRequestException(
        'Cannot update a cancelled product. Activate it first.',
      );
    }

    await this.productRepo.update(id, data);

    return {
      message: 'Product updated successfully',
    };
  }

  async cancelProduct(id: string) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.status === PRODUCT_STATUS_ENUM.CANCELLED) {
      throw new BadRequestException('Product is already cancelled');
    }

    await this.productRepo.update(id, {
      status: PRODUCT_STATUS_ENUM.CANCELLED,
    });

    return {
      message: 'Product cancelled successfully',
    };
  }

  async activateProduct(id: string) {
    const product = await this.productRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.status !== PRODUCT_STATUS_ENUM.CANCELLED) {
      throw new BadRequestException('Only cancelled product can be activated');
    }

    await this.productRepo.update(id, {
      status: PRODUCT_STATUS_ENUM.IN_STOCK,
    });

    return {
      message: 'Product activated successfully',
    };
  }

  async searchProducts(query: ProductQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const qb = this.productRepo.createQueryBuilder('p');

    // mặc định không lấy cancelled
    const includeCancelled = query.includeCancelled === 'true';
    if (!includeCancelled) {
      qb.andWhere('p.status != :cancelled', {
        cancelled: PRODUCT_STATUS_ENUM.CANCELLED,
      });
    }

    // search theo code/name
    if (query.q?.trim()) {
      const keyword = `%${query.q.trim()}%`;
      qb.andWhere(
        new Brackets((sub) => {
          // Postgres => ILIKE
          sub
            .where('p.code ILIKE :keyword', { keyword })
            .orWhere('p.name ILIKE :keyword', { keyword });
        }),
      );
    }

    // filter status
    if (query.status) {
      qb.andWhere('p.status = :status', { status: query.status });
    }

    // filter categoryId
    if (query.categoryId) {
      qb.andWhere('p.categoryId = :categoryId', {
        categoryId: query.categoryId,
      });
    }

    // filter inventoryDocumentId
    if (query.inventoryDocumentId) {
      qb.andWhere('p.inventoryDocumentId = :inventoryDocumentId', {
        inventoryDocumentId: query.inventoryDocumentId,
      });
    }

    // sort mới nhất trước
    // chú ý tên cột: nếu entity là createAt/updateAt thì đổi thành p.createAt
    qb.orderBy('p.createAt', 'DESC');

    const [items, total] = await qb.skip(skip).take(limit).getManyAndCount();

    return {
      message: 'Search products successfully',
      data: {
        items,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        filters: {
          q: query.q ?? null,
          status: query.status ?? null,
          categoryId: query.categoryId ?? null,
          inventoryDocumentId: query.inventoryDocumentId ?? null,
          includeCancelled,
        },
      },
    };
  }
}
