import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemInfo } from '../entities/systemInfo.entity';
import * as dayjs from 'dayjs';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(SystemInfo)
    private readonly systemInfo: Repository<SystemInfo>,
  ) {}
  editSystemInfo(data: UpdateDto) {
    const updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');

    try {
      this.systemInfo.update(1, {
        ...data,
        updatedAt,
      });
      return '更新成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  getSystemInfo() {
    try {
      return this.systemInfo.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
