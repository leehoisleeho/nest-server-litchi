import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('system_info')
export class SystemInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  system_name: string;

  @Column()
  system_version: string;

  @Column({ nullable: true })
  system_logo_url: string;

  @Column({ nullable: true })
  updatedAt: string;
}
