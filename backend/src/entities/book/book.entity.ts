import { Entity, Column, OneToMany } from 'typeorm';

import { BaseEntity } from '../base.entity';
import { Project } from './project.entity';
import { BookStatus } from './book.enums';

@Entity('books')
export class Book extends BaseEntity {
  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: BookStatus,
    default: BookStatus.ACTIVE,
  })
  status: BookStatus;

  @Column()
  imgUrl: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  gameUrl?: string;

  @OneToMany(() => Project, (project) => project.book, {
    cascade: true,
  })
  projects: Project[];
}