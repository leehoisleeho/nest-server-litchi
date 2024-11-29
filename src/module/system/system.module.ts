import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemInfo } from '../../entities/systemInfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemInfo])],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
