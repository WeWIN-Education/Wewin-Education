import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Product } from './product.entity';
import { InventoryMovement } from './inventory-movement.entity';

@Entity('inventory_movement_item')
@Unique(['inventoryMovementId', 'productId'])
export class InventoryMovementItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'inventory_movement_id', type: 'uuid' })
  inventoryMovementId!: string;

  @ManyToOne(() => InventoryMovement, (movement) => movement.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'inventory_movement_id' })
  inventoryMovement!: InventoryMovement;

  @Column({ name: 'product_id', type: 'uuid' })
  productId!: string;

  @ManyToOne(() => Product, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'text', nullable: true })
  note?: string;
}
