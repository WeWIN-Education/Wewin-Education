import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '../role/role.entity';
import { BaseEntity } from '../base.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date', nullable: true })
  dob?: Date | null;

  @Column({ type: 'text', nullable: true })
  address?: string | null;

  @Column({ type: 'varchar', nullable: true })
  phone?: string | null;

  @Column({ unique: true })
  email: string;

  // Fix: password cần nullable cho Google Login
  @Column({ type: 'text', nullable: true })
  @Exclude()
  password?: string | null;

  // Fix: thêm field image
  @Column({ type: 'text', nullable: true })
  image?: string | null;

  @Column({ type: 'text', nullable: true })
  @Exclude()
  refreshToken?: string | null;

  @ManyToMany(() => Role, (role) => role.users, { cascade: true })
  @JoinTable()
  roles: Role[];
}
