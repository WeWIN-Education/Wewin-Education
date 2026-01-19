import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Book } from './book.entity';
import { LearningNode } from './learning-node.entity';

@Entity('projects')
export class Project extends BaseEntity {
  @ManyToOne(() => Book, (book) => book.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Index()
  @Column()
  bookId: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: 0 })
  order: number;

  @OneToMany(() => LearningNode, (node) => node.project, {
    cascade: true,
  })
  learningNodes: LearningNode[];
}
