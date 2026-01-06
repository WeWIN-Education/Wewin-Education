import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { LearningNode } from './learning-node.entity';
import { LessonBlockType } from './book.enums';

@Entity('lesson_blocks')
export class LessonBlock extends BaseEntity {
  @ManyToOne(() => LearningNode, (node) => node.lessonBlocks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'learning_node_id' })
  learningNode: LearningNode;

  @Index()
  @Column()
  learningNodeId: string;

  @Column()
  title: string;

  @Column({ type: 'enum', enum: LessonBlockType })
  type: LessonBlockType;

  @Column({ default: 0 })
  order: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  audioUrl?: string;
}
