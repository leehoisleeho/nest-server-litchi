import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MenuEntity } from './menu.entity';

@Entity('directory')
export class DirectoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  directory_name: string;

  @Column()
  router_path: string;

  @Column()
  icon_name: string;

  @Column()
  sort: number;

  @Column()
  isShow: string;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt: string;

  @Column()
  isMenu: string;

  @Column({ nullable: true })
  file_path: string;

  @OneToMany(() => MenuEntity, (menu) => menu.parent)
  children: MenuEntity[];
}
