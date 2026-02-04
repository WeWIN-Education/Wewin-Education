import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Product } from './product.entity';
import { InventoryMovement } from './inventory-movement.entity';

@Entity('inventory_movement_item')
export class InventoryMovementItem extends BaseEntity {
  @PrimaryColumn({ name: 'inventory_id' })
  inventoryId: string;

  @ManyToOne(
    () => InventoryMovement,
    (inventoryMovement) => inventoryMovement.items,
  )
  @JoinColumn({ name: 'inventory_id' })
  inventoryMovement: InventoryMovement;

  @PrimaryColumn({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @Column({ type: 'text', nullable: true })
  note: string;
}
