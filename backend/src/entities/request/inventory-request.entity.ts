import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InventoryRequestItem } from './inventory-request-items.entity';
import {
  PURCHASE_ORDERS_STATUS_ENUM,
  PURCHASE_ORDERS_TYPE_ENUM,
} from '../../util/enum';
import { BaseEntity } from '../base.entity';
import { User } from '../user/user.entity';

@Entity('inventory_request')
export class InventoryRequest extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text', nullable: false })
  code!: string;

  @Column({ type: 'text', nullable: false })
  name!: string;

  @Column({ type: 'text', nullable: true })
  note!: string;

  @Column({ name: 'image_url', type: 'simple-array', nullable: true })
  imageUrl!: string[] | null;

  @Column({ type: 'enum', enum: PURCHASE_ORDERS_STATUS_ENUM, nullable: true })
  status!: PURCHASE_ORDERS_STATUS_ENUM;

  @Column({ type: 'enum', enum: PURCHASE_ORDERS_TYPE_ENUM, nullable: true })
  type!: PURCHASE_ORDERS_TYPE_ENUM;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'create_by' })
  createBy!: User;
  @OneToMany(
    () => InventoryRequestItem,
    (inventoryRequestItem) => inventoryRequestItem.inventoryRequest,
    { cascade: true, orphanedRowAction: 'delete' },
  )
  items!: InventoryRequestItem[];
}
