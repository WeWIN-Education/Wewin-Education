import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive: boolean;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
  })
  createAt?: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp',
  })
  updateAt?: Date;

  @DeleteDateColumn({
    name: 'delete_at',
    type: 'timestamp',
    select: false,
    nullable: true,
  })
  deleteAt: Date;
}
