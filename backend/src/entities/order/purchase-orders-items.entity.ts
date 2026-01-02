import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PurchaseOrders } from './purchase-orders.entity';
import { Product } from '../inventory/product.entity';
import { BaseEntity } from '../base.entity';

@Entity()
export class PurchaseOrdersItems extends BaseEntity {
  @PrimaryColumn({ name: 'purchaseOrderId' })
  purchaseOrderId: string;

  @PrimaryColumn({ name: 'productId' })
  productId: string;

  @ManyToOne(() => PurchaseOrders, (purchaseOrder) => purchaseOrder.items)
  @JoinColumn({ name: 'purchaseOrderId' })
  purchaseOrder: PurchaseOrders;

  @ManyToOne(() => Product, (product) => product.items)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'int', nullable: false })
  quantityRequest: number;

  @Column({ type: 'text', nullable: false })
  unitPriceRequest: string;

  @Column({ type: 'float', nullable: false })
  vatPriceRequest: number;

  @Column({ type: 'bigint', nullable: false })
  totalPriceRequest: bigint;

  @Column({ type: 'text', nullable: true })
  noteRequest: string;

  @Column({ type: 'int', nullable: false })
  quantityOrder: number;

  @Column({ type: 'text', nullable: false })
  unitPriceOrder: string;

  @Column({ type: 'float', nullable: false })
  vatPriceOrder: number;

  @Column({ type: 'bigint', nullable: false })
  totalPriceOrder: bigint;

  @Column({ type: 'text', nullable: true })
  noteOrder: string;
}
