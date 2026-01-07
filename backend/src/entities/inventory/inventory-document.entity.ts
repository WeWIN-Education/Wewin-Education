import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Product } from './product.entity';

@Entity()
export class InventoryDocument extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  note: string;

  @Column({ name: 'create_by', type: 'uuid', nullable: false })
  createBy: string;

  @OneToMany(() => Product, (product) => product.inventoryDocumentId)
  products: Product[];
}
