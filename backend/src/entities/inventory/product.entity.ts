import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { IntentoryDocumentItems } from './inventory-document-items.entity';
import { PurchaseOrdersItems } from '../order/purchase-orders-items.entity';
import { InventoryDocument } from './inventory-document.entity';
import { PRODUCT_STATUS_ENUM } from '../../util/enum';
import { BaseEntity } from '../base.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  code: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  unit: string;

  @Column({ type: 'int', nullable: true })
  quantity: number;

  @Column({ type: 'simple-array', nullable: true })
  imageUrl: string[] | null;

  @Column({ type: 'enum', enum: PRODUCT_STATUS_ENUM, nullable: true })
  status: PRODUCT_STATUS_ENUM;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @ManyToOne(
    () => InventoryDocument,
    (inventoryDocument) => inventoryDocument.id,
  )
  inventoryDocument: InventoryDocument;

  @OneToMany(
    () => IntentoryDocumentItems,
    (inventoryDocumentItems) => inventoryDocumentItems.id,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  inventoryDocumentItems: IntentoryDocumentItems[];

  @OneToMany(
    () => PurchaseOrdersItems,
    (purchaseOrderItems) => purchaseOrderItems.product,
    {
      cascade: true,
    },
  )
  items: PurchaseOrdersItems[];
}
