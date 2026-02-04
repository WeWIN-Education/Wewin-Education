import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { InventoryMovementItem } from './inventory-movement-items.entity';
import { InventoryRequest } from '../order/inventory-request.entity';
import { PURCHASE_ORDERS_TYPE_ENUM } from '../../util/enum';

@Entity('inventory_movement')
export class InventoryMovement extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: PURCHASE_ORDERS_TYPE_ENUM, nullable: false })
  type: PURCHASE_ORDERS_TYPE_ENUM;

  @Column({ type: 'text', nullable: false })
  note: string;

  @Column({ name: 'create_by', type: 'uuid', nullable: false })
  createBy: string;

  @Column({ name: 'inventory_request_id', type: 'uuid', nullable: true })
  inventoryRequestId: string | null;

  @ManyToOne(() => InventoryRequest, { nullable: true })
  @JoinColumn({ name: 'inventory_request_id' })
  inventoryRequest?: InventoryRequest | null;

  @OneToMany(
    () => InventoryMovementItem,
    (inventoryMovementItem) => inventoryMovementItem.inventoryMovement,
    { cascade: true },
  )
  items: InventoryMovementItem[];
}
