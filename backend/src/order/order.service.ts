import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { PurchaseOrders } from 'src/entities/order/purchase-orders.entity';
import {
  PURCHASE_ORDERS_ACTION_ENUM,
  PURCHASE_ORDERS_STATUS_ENUM,
} from 'src/util/enum';
import { UserService } from 'src/user/user.service';
import { Product } from 'src/entities/inventory/product.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateStatusDto } from 'src/user/dto/update-status.dto';

type WhereCondition<T> = Partial<Record<keyof T, any>>;

@Injectable()
export class OrderService {
  private readonly allowedStatusesForCreation = [
    PURCHASE_ORDERS_STATUS_ENUM.DRAFT,
    PURCHASE_ORDERS_STATUS_ENUM.REQUESTED,
    '',
  ];

  private readonly allowedStatusesForAdminAction = [
    PURCHASE_ORDERS_STATUS_ENUM.REQUESTED,
    PURCHASE_ORDERS_STATUS_ENUM.ORDER_REQUESTED,
    '',
  ];

  constructor(
    @InjectRepository(PurchaseOrders)
    private readonly repoPurchaseOrders: Repository<PurchaseOrders>,
    @InjectRepository(Product)
    private readonly repoProduct: Repository<Product>,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    if (
      !this.allowedStatusesForCreation.includes(createOrderDto.status ?? '')
    ) {
      throw new Error('Cannot create order with DRAFT | REQUESTED status');
    }

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const checkProducts = await this.repoProduct.find({
      select: ['id'],
      where: {
        id: In(createOrderDto.items.map((item) => item.productId)),
      },
    });

    if (checkProducts.length !== createOrderDto.items.length) {
      const filterProductErr = createOrderDto.items.filter(
        (item) => !checkProducts.find((prod) => prod.id === item.productId),
      );
      const productId = filterProductErr
        .map((item) => item.productId)
        .join(', ');
      throw new Error(`Product [${productId}] not found`);
    }

    const purchaseOrder = this.repoPurchaseOrders.create({
      ...createOrderDto,
      status: createOrderDto.status || PURCHASE_ORDERS_STATUS_ENUM.REQUESTED,
      createBy: user,
    });

    await this.repoPurchaseOrders.save(purchaseOrder);
    return {
      statusCode: 200,
      message: 'Order created successfully',
    };
  }

  async findAll() {
    return await this.findByCondition({});
  }

  async findById(id: string) {
    return await this.findByCondition({
      id: id,
    });
  }

  async findByUserId(userId: string) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return await this.findByCondition({
      createBy: {
        id: userId,
      },
    });
  }

  async findByStatus(status: PURCHASE_ORDERS_STATUS_ENUM, userId: string) {
    return await this.findByCondition({
      status: status,
      createBy: {
        id: userId,
      },
    });
  }

  async findByCondition(condition: WhereCondition<PurchaseOrders>) {
    const purchaseOrders = await this.repoPurchaseOrders.find({
      where: {
        ...condition,
        isActive: true,
      },
      relations: ['createBy', 'items'],
    });

    if (!purchaseOrders || purchaseOrders.length === 0) {
      throw new Error('No orders found matching the condition');
    }

    return this.convertDBToResponse(purchaseOrders);
  }

  async duplicatePurchaseOrder(id: string) {
    const purchaseOrders = await this.findByCondition({
      id,
    });

    const purchaseOrder = {
      ...purchaseOrders[0],
      id: '',
      status: PURCHASE_ORDERS_STATUS_ENUM.DRAFT,
      isActive: true,
      deleteAt: null,
    };

    return purchaseOrder;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const purchaseOrder = await this.repoPurchaseOrders.findOne({
      where: {
        id: id,
        isActive: true,
      },
      relations: ['items'],
    });
    if (!purchaseOrder) {
      throw new Error('Order not found');
    }

    Object.assign(purchaseOrder, updateOrderDto);
    purchaseOrder.updateAt = new Date();

    Object.assign(purchaseOrder.items, updateOrderDto.items);

    await this.repoPurchaseOrders.save(purchaseOrder);

    return {
      statusCode: 201,
      message: 'Order updated successfully',
    };
  }

  async updateStatus(
    id: string,
    userId: string,
    updateStatusDto: UpdateStatusDto,
  ) {
    const purchaseOrder = await this.repoPurchaseOrders.findOne({
      where: {
        id: id,
        isActive: true,
      },
    });
    if (!purchaseOrder) {
      throw new Error('Order not found');
    }

    const stateAction = this.doAction(updateStatusDto.action);

    const isValidStatus = Array.isArray(stateAction.from)
      ? stateAction.from.includes(purchaseOrder.status)
      : purchaseOrder.status === stateAction.from;

    if (!isValidStatus) {
      throw new Error('Cannot update purchase order status');
    }

    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const roles = user.roles
      .map((role) => role.name)
      .filter((name) => stateAction.permission.includes(name));

    if (roles.length === 0) {
      throw new Error('You are not authorized to approved this order');
    }

    purchaseOrder.status = stateAction.to;
    purchaseOrder.updateAt = new Date();

    await this.repoPurchaseOrders.save(purchaseOrder);

    return {
      statusCode: 201,
      newStatus: stateAction.to,
      message: 'Order status updated successfully',
    };
  }

  private doAction(action: PURCHASE_ORDERS_ACTION_ENUM) {
    switch (action) {
      case PURCHASE_ORDERS_ACTION_ENUM.REQUEST:
        return {
          from: PURCHASE_ORDERS_STATUS_ENUM.DRAFT,
          to: PURCHASE_ORDERS_STATUS_ENUM.REQUESTED,
          permission: ['USER', 'ADMIN'],
        };
      case PURCHASE_ORDERS_ACTION_ENUM.APPROVE:
        return {
          from: PURCHASE_ORDERS_STATUS_ENUM.REQUESTED,
          to: PURCHASE_ORDERS_STATUS_ENUM.APPROVED,
          permission: ['ADMIN'],
        };
      case PURCHASE_ORDERS_ACTION_ENUM.ORDER:
        return {
          from: PURCHASE_ORDERS_STATUS_ENUM.APPROVED,
          to: PURCHASE_ORDERS_STATUS_ENUM.ORDER_REQUESTED,
          permission: ['USER', 'ADMIN'],
        };
      case PURCHASE_ORDERS_ACTION_ENUM.ORDER_APPROVE:
        return {
          from: PURCHASE_ORDERS_STATUS_ENUM.ORDER_REQUESTED,
          to: PURCHASE_ORDERS_STATUS_ENUM.ORDER_APPROVED,
          permission: ['ADMIN'],
        };
      case PURCHASE_ORDERS_ACTION_ENUM.CANCEL:
        return {
          from: [
            PURCHASE_ORDERS_STATUS_ENUM.REQUESTED,
            PURCHASE_ORDERS_STATUS_ENUM.APPROVED,
            PURCHASE_ORDERS_STATUS_ENUM.ORDER_APPROVED,
          ],
          to: PURCHASE_ORDERS_STATUS_ENUM.CANCELLED,
          permission: ['USER', 'ADMIN'],
        };
      default:
        throw new Error('Invalid action');
    }
  }

  async remove(id: string) {
    await this.repoPurchaseOrders.save({
      id: id,
      isActive: false,
      deleteAt: new Date(),
    });

    return {
      statusCode: 201,
      message: 'Order deleted successfully',
    };
  }

  private convertDBToResponse(purchaseOrders: PurchaseOrders[]) {
    return purchaseOrders.map((order) => ({
      ...order,
      createBy: {
        id: order.createBy.id,
        name: order.createBy.name,
      },
    }));
  }
}
