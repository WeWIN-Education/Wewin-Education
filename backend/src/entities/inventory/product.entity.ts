import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InventoryDocumentItems } from './inventory-document-items.entity';
import { PurchaseOrdersItems } from '../order/purchase-orders-items.entity';
import { PRODUCT_STATUS_ENUM } from '../../util/enum';
import { BaseEntity } from '../base.entity';
import { Category } from './category.entity';

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

  @Column({ type: 'simple-array', nullable: true, name: 'image_url' })
  imageUrl: string[] | null;

  @Column({ type: 'enum', enum: PRODUCT_STATUS_ENUM, nullable: true })
  status: PRODUCT_STATUS_ENUM;

  @Column({ name: 'category_id', type: 'uuid', nullable: false })
  categoryId: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'RESTRICT', // hoặc CASCADE nếu bạn muốn
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'inventory_document_id', type: 'uuid', nullable: false })
  inventoryDocumentId: string;

  @OneToMany(
    () => InventoryDocumentItems,
    (inventoryDocumentItems) => inventoryDocumentItems.productId,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  inventoryDocumentItems: InventoryDocumentItems[];

  @OneToMany(
    () => PurchaseOrdersItems,
    (purchaseOrderItems) => purchaseOrderItems.product,
    {
      cascade: true,
    },
  )
  items: PurchaseOrdersItems[];
}
