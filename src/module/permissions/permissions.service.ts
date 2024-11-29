import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import * as dayjs from 'dayjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from '../../entities/permissions.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permissions)
    private readonly permissionsRepository: Repository<Permissions>,
  ) {}
  async create(data: CreateDto) {
    try {
      const permissions = await this.permissionsRepository.findOne({
        where: { permissions_name: data.permissions_name },
      });
      if (permissions) {
        throw new HttpException('权限已存在', HttpStatus.BAD_REQUEST);
      }
      const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
      await this.permissionsRepository.save({ ...data, createdAt });
      return '创建成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number) {
    try {
      const permissions = await this.permissionsRepository.findOne({
        where: { id },
      });
      if (!permissions) {
        throw new HttpException('权限不存在', HttpStatus.BAD_REQUEST);
      }
      await this.permissionsRepository.delete(id);
      return '删除成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findAll() {
    try {
      return await this.permissionsRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      return await this.permissionsRepository.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, data) {
    try {
      const permissions = await this.permissionsRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!permissions) {
        throw new HttpException('权限不存在', HttpStatus.BAD_REQUEST);
      }
      // 更新
      await this.permissionsRepository.update(id, {
        ...data,
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
      return '更新成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
