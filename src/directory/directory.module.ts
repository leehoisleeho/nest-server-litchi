import { Module } from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { MenuController } from './directory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectoryEntity } from '../entities/directory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DirectoryEntity])],
  providers: [DirectoryService],
  controllers: [MenuController],
})
export class DirectoryModule {}
