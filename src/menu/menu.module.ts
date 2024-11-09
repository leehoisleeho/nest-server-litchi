import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from '../entities/menu.entity';
import { Permissions } from '../entities/permissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity, Permissions])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
