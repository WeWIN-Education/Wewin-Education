import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Product } from './product.entity';
import { BaseEntity } from '../base.entity';

@Entity()
export class InventoryDocument extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  note: string;

  @ManyToOne(() => User, (user) => user.id, { cascade: false })
  createBy: User;

  @OneToMany(() => Product, (product) => product.id, {
    cascade: true,
  })
  products: Product[];
}
