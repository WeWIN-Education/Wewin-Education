import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/inventory/product.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { Permission } from 'src/entities/role/permission.entity';
import { Role } from 'src/entities/role/role.entity';
import { User } from 'src/entities/user/user.entity';
import { InventoryRequest } from 'src/entities/request/inventory-request.entity';
import { InventoryRequestItem } from 'src/entities/request/inventory-request-items.entity';
import { InventoryMovement } from 'src/entities/inventory/inventory-movement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InventoryRequest,
      InventoryRequestItem,
      InventoryMovement,
      Product,
      User,
      Role,
      Permission,
    ]),
    AuthModule,
    UserModule,
  ],
  controllers: [RequestController],
  providers: [RequestService],
  exports: [RequestService],
})
export class RequestModule {}
