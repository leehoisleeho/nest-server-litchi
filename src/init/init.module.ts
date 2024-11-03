import { Module } from '@nestjs/common';
import { InitController } from './init.controller';
import { InitService } from './init.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { DirectoryEntity } from '../entities/directory.entity';
import { MenuEntity } from '../entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, DirectoryEntity, MenuEntity])],
  controllers: [InitController],
  providers: [InitService],
})
export class InitModule {}
