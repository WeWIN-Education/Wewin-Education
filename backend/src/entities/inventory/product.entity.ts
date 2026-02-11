import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InventoryRequestItem } from '../request/inventory-request-items.entity';
import { PRODUCT_STATUS_ENUM } from '../../util/enum';
import { BaseEntity } from '../base.entity';
import { ProductCategory } from './category.entity';
import { InventoryMovementItem } from './inventory-movement-items.entity';

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

  @ManyToOne(() => ProductCategory, (category) => category.products, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'category_id' })
  category: ProductCategory;

  @OneToMany(
    () => InventoryMovementItem,
    (inventoryMovementItem) => inventoryMovementItem.product,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  inventoryMovementItem: InventoryMovementItem[];

  @OneToMany(
    () => InventoryRequestItem,
    (inventoryRequestItem) => inventoryRequestItem.product,
    {
      cascade: true,
    },
  )
  items: InventoryRequestItem[];
}
