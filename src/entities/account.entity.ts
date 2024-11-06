import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Permissions } from './permissions.entity';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: true })
  permission: string;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt: string;

  @ManyToOne(() => Permissions)
  permissions: Permissions;

  @Column({ name: 'permissionsId', nullable: true })
  permissionsId: number;
}
