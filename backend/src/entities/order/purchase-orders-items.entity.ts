import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PurchaseOrders } from './purchase-orders.entity';
import { Product } from '../inventory/product.entity';

@Entity()
export class PurchaseOrdersItems {
  @PrimaryColumn({ name: 'purchase_order_id' })
  purchaseOrderId: string;

  @PrimaryColumn({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => PurchaseOrders, (purchaseOrder) => purchaseOrder.items)
  @JoinColumn({ name: 'purchase_order_id' })
  purchaseOrder: PurchaseOrders;

  @ManyToOne(() => Product, (product) => product.items)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int', nullable: true, name: 'quantity_request' })
  quantityRequest: number;

  @Column({ type: 'text', nullable: true, name: 'unit_price_request' })
  unitPriceRequest: string;

  @Column({ type: 'float', nullable: true, name: 'vat_price_request' })
  vatPriceRequest: number;

  @Column({ type: 'bigint', nullable: true, name: 'total_price_request' })
  totalPriceRequest: bigint;

  @Column({ type: 'text', nullable: true, name: 'note_request' })
  noteRequest: string;

  @Column({ type: 'int', nullable: true, name: 'quantity_order' })
  quantityOrder: number;

  @Column({ type: 'text', nullable: true, name: 'unit_price_order' })
  unitPriceOrder: string;

  @Column({ type: 'float', nullable: true, name: 'vat_price_order' })
  vatPriceOrder: number;

  @Column({ type: 'bigint', nullable: true, name: 'total_price_order' })
  totalPriceOrder: bigint;

  @Column({ type: 'text', nullable: true, name: 'note_order' })
  noteOrder: string;
}
