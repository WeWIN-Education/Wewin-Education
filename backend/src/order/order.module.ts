import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PurchaseOrders } from 'src/entities/order/purchase-orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseOrdersItems } from 'src/entities/order/purchase-orders-items.entity';
import { Product } from 'src/entities/inventory/product.entity';
import { InventoryDocumentItems } from 'src/entities/inventory/inventory-document-items.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { Permission } from 'src/entities/role/permission.entity';
import { Role } from 'src/entities/role/role.entity';
import { User } from 'src/entities/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PurchaseOrders,
      PurchaseOrdersItems,
      Product,
      InventoryDocumentItems,
      User,
      Role,
      Permission,
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
