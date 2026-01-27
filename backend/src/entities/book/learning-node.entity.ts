import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Project } from './project.entity';
import { LearningNodeType } from './book.enums';
import { LessonBlock } from './lesson-block.entity';

@Entity('learning_nodes')
export class LearningNode extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.learningNodes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Index()
  @Column()
  projectId: string;

  @ManyToOne(() => LearningNode, (node) => node.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent?: LearningNode;

  @OneToMany(() => LearningNode, (node) => node.parent, {
    cascade: true,
  })
  children: LearningNode[];

  @Index()
  @Column({ nullable: true })
  parentId?: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: LearningNodeType })
  type: LearningNodeType;

  @Column({ default: 0 })
  order: number;

  @OneToMany(() => LessonBlock, (block) => block.learningNode, {
    cascade: true,
  })
  lessonBlocks: LessonBlock[];
}
