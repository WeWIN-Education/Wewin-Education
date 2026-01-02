import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PurchaseOrdersItems } from './purchase-orders-items.entity';
import { User } from '../user/user.entity';
import {
  PURCHASE_ORDERS_STATUS_ENUM,
  PURCHASE_ORDERS_TYPE_ENUM,
} from '../../util/enum';
import { BaseEntity } from '../base.entity';

@Entity()
export class PurchaseOrders extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  code: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ type: 'simple-array', nullable: true })
  imageUrl: string[] | null;

  @Column({ type: 'enum', enum: PURCHASE_ORDERS_STATUS_ENUM, nullable: true })
  status: PURCHASE_ORDERS_STATUS_ENUM;

  @Column({ type: 'enum', enum: PURCHASE_ORDERS_TYPE_ENUM, nullable: true })
  type: PURCHASE_ORDERS_TYPE_ENUM;

  @ManyToOne(() => User, (user) => user.id, { cascade: false })
  createBy: User;

  @OneToMany(
    () => PurchaseOrdersItems,
    (purchaseOrderItem) => purchaseOrderItem.purchaseOrder,
    { cascade: true },
  )
  items: PurchaseOrdersItems[];
}
