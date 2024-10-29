import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu')
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  menu_name: string;

  @Column()
  key: string;

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
}
