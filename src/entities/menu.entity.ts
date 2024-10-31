import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { DirectoryEntity } from './directory.entity';

@Entity('menu')
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  menu_name: string;

  @Column()
  file_path: string;

  @Column()
  router_path: string;

  @Column()
  isShow: string;

  @Column()
  sort: number;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt: string;

  @ManyToOne(() => DirectoryEntity)
  parent: DirectoryEntity;

  @Column({ name: 'parentId' })
  parentId: number;
}
