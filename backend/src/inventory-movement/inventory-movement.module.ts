import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryMovement } from 'src/entities/inventory/inventory-movement.entity';
import { InventoryMovementItem } from 'src/entities/inventory/inventory-movement-items.entity';
import { InventoryMovementService } from './inventory-movement.service';
import { InventoryMovementController } from './inventory-movement.controller';
import { User } from 'src/entities/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryMovement, InventoryMovementItem, User]),
  ],
  controllers: [InventoryMovementController],
  providers: [InventoryMovementService],
})
export class InventoryMovementModule {}
