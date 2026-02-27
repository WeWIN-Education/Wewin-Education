import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Product } from '../../entities/inventory/product.entity';
import { BadRequestException } from '@nestjs/common';
import { PRODUCT_STATUS_ENUM } from '../../util/enum';
import { Brackets } from 'typeorm';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async getProducts() {
    return this.productRepo.find({
      where: { status: PRODUCT_STATUS_ENUM.IN_STOCK },
      order: { createAt: 'DESC' },
    });
  }

  async addProduct(data: Partial<Product>) {
    if (!data.code?.trim()) {
      throw new BadRequestException('Product code is required');
    }

    const existed = await this.productRepo.findOne({
      where: { code: data.code.trim() },
    });

    if (existed) {
      throw new BadRequestException(
        `Product code "${data.code}" already exists`,
      );
    }

    // ✅ normalize
    data.code = data.code.trim();
    data.name = data.name?.trim();

    // ✅ default quantity nếu rỗng
    if (data.quantity === undefined || data.quantity === null) {
      data.quantity = 0;
    }

    // ✅ validate quantity
    if (typeof data.quantity !== 'number' || Number.isNaN(data.quantity)) {
      throw new BadRequestException('Quantity must be a valid number');
    }
    if (data.quantity < 0) {
      throw new BadRequestException('Quantity cannot be negative');
    }

    // ❌ không cho create CANCELLED (nếu bạn muốn)
    if (data.status === PRODUCT_STATUS_ENUM.CANCELLED) {
      throw new BadRequestException(
        'Cannot create product with CANCELLED status',
      );
    }

    // ✅ auto compute status theo quantity (rule giống update)
    if (data.quantity === 0) {
      data.status = PRODUCT_STATUS_ENUM.OUT_OF_STOCK;
    } else if (data.quantity <= 20) {
      data.status = PRODUCT_STATUS_ENUM.LOW_STOCK;
    } else {
      data.status = PRODUCT_STATUS_ENUM.IN_STOCK;
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
    if (!product) throw new NotFoundException('Product not found');

    if (product.status === PRODUCT_STATUS_ENUM.CANCELLED) {
      throw new BadRequestException(
        'Cannot update a cancelled product. Activate it first.',
      );
    }

    // ❌ chặn set cancelled bằng update (dùng cancelProduct endpoint)
    if (data.status === PRODUCT_STATUS_ENUM.CANCELLED) {
      throw new BadRequestException(
        'Cannot set CANCELLED in update. Use cancelProduct instead.',
      );
    }

    if (data.quantity !== undefined && data.quantity !== null) {
      if (typeof data.quantity !== 'number' || Number.isNaN(data.quantity)) {
        throw new BadRequestException('Quantity must be a valid number');
      }

      if (data.quantity < 0) {
        throw new BadRequestException('Quantity cannot be negative');
      }

      // auto compute status theo rule bạn yêu cầu
      if (data.quantity === 0) {
        data.status = PRODUCT_STATUS_ENUM.OUT_OF_STOCK;
      } else if (data.quantity <= 20) {
        data.status = PRODUCT_STATUS_ENUM.LOW_STOCK;
      } else {
        data.status = PRODUCT_STATUS_ENUM.IN_STOCK;
      }
    }

    await this.productRepo.update(id, data);

    return { message: 'Product updated successfully' };
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

  async getProductById(id: string, includeCancelled = false) {
    const qb = this.productRepo.createQueryBuilder('p');

    qb.where('p.id = :id', { id });

    if (!includeCancelled) {
      qb.andWhere('p.status != :cancelled', {
        cancelled: PRODUCT_STATUS_ENUM.CANCELLED,
      });
    }

    const product = await qb.getOne();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return {
      message: 'Get product successfully',
      data: product,
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

    // ===== SORTING =====
    const sortBy = query.sortBy ?? 'createAt';
    const order =
      (query.order ?? 'DESC').toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // ✅ allowlist để tránh SQL injection
    const ALLOWED_SORT: Record<string, true> = {
      createAt: true,
      updateAt: true,
      name: true,
      code: true,
      quantity: true,
      status: true,
    };

    const safeSortBy = ALLOWED_SORT[sortBy] ? sortBy : 'createAt';

    // 1) cancelled luôn nằm cuối
    qb.orderBy('CASE WHEN p.status = :cancelled_sort THEN 1 ELSE 0 END', 'ASC')
      // 2) sau đó sort theo field yêu cầu (mặc định createAt DESC)
      .addOrderBy(`p.${safeSortBy}`, order);

    // 3) tie-breaker: luôn ưu tiên mới nhất khi trùng / khi sortBy khác createAt
    if (safeSortBy !== 'createAt') {
      qb.addOrderBy('p.createAt', 'DESC');
    }

    qb.setParameter('cancelled_sort', PRODUCT_STATUS_ENUM.CANCELLED);

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
          includeCancelled,
        },
      },
    };
  }
}
