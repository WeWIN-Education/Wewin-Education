import { Column } from 'typeorm';

export abstract class BaseEntity {
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'date', nullable: false, default: () => 'CURRENT_DATE' })
  createAt: Date;

  @Column({
    type: 'date',
    default: () => 'CURRENT_DATE',
    onUpdate: 'CURRENT_DATE',
  })
  updateAt: Date;
}
