import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DirectoryEntity } from '../entities/directory.entity';
import * as dayjs from 'dayjs';
import { UpdateDto } from './dto/update.dto';
import { Permissions } from '../entities/permissions.entity';

@Injectable()
export class DirectoryService {
  constructor(
    @InjectRepository(DirectoryEntity)
    private readonly directoryRepository: Repository<DirectoryEntity>,
    @InjectRepository(Permissions)
    private readonly permissionsRepository: Repository<Permissions>,
  ) {}
  async create(data: CreateDto) {
    try {
      const menu = await this.directoryRepository.findOne({
        where: { directory_name: data.directory_name },
      });

      if (menu) {
        throw new HttpException('目录已存在', HttpStatus.BAD_REQUEST);
      }

      const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
      await this.directoryRepository.save({ ...data, createdAt });
      return '创建成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async delete(id: number) {
    try {
      const menu = await this.directoryRepository.findOne({
        where: { id },
      });
      if (!menu) {
        throw new HttpException('目录不存在', HttpStatus.BAD_REQUEST);
      }
      await this.directoryRepository.delete(id);
      const permissions = await this.permissionsRepository.find();
      permissions.forEach((element) => {
        const res = JSON.parse(element.permissions_list);
        res.forEach(async (item: any) => {
          if (item.id === id) {
            // 从数组里面移出
            res.splice(res.indexOf(item), 1);
            await this.permissionsRepository.update(element.id, {
              permissions_list: JSON.stringify(res),
            });
          }
        });
      });
      return '删除成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async update(id: number, updateMenuDto: UpdateDto) {
    try {
      const directory = await this.directoryRepository.findOne({
        where: { id },
      });
      if (!directory) {
        throw new HttpException('目录不存在', HttpStatus.BAD_REQUEST);
      }
      const updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
      await this.directoryRepository.update(id, {
        ...updateMenuDto,
        updatedAt,
      });
      const permissions = await this.permissionsRepository.find();
      permissions.forEach((element) => {
        const res = JSON.parse(element.permissions_list);
        res.forEach(async (item: any) => {
          if (item.id === id) {
            item.directory_name = updateMenuDto.directory_name;
            item.router_path = updateMenuDto.router_path;
            item.icon_name = updateMenuDto.icon_name;
            item.sort = updateMenuDto.sort;
            item.isShow = updateMenuDto.isShow;
            item.isMenu = updateMenuDto.isMenu;
            item.file_path = updateMenuDto.file_path;
            await this.permissionsRepository.update(element.id, {
              updatedAt,
              permissions_list: JSON.stringify(res),
            });
          }
        });
      });
      return '更新成功';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // 查看全部
  async getAllMenu() {
    try {
      return await this.directoryRepository.find({
        relations: ['children'],
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // 查看单个
  async getOneMenu(id: number) {
    try {
      const menu = await this.directoryRepository.findOneBy({ id });
      if (!menu) {
        throw new HttpException('目录不存在', HttpStatus.BAD_REQUEST);
      }
      return menu;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
