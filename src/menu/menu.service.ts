import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from '../entities/menu.entity';
import * as dayjs from 'dayjs';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}
  async create(data: CreateDto) {
    try {
      const menu = await this.menuRepository.findOne({
        where: { menu_name: data.menu_name },
      });

      if (menu) {
        throw new HttpException('菜单已存在', HttpStatus.BAD_REQUEST);
      }

      const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
      await this.menuRepository.save({ ...data, createdAt });
      return '创建成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async delete(id: number) {
    try {
      const menu = await this.menuRepository.findOne({
        where: { id },
      });
      if (!menu) {
        throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
      }
      await this.menuRepository.delete(id);
      return '删除成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async update(id: number, updateMenuDto: UpdateDto) {
    try {
      const menu = await this.menuRepository.findOne({
        where: { id },
      });
      if (!menu) {
        throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
      }
      const updatedAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
      await this.menuRepository.update(id, {
        ...updateMenuDto,
        updatedAt,
      });
      return '更新成功';
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // 查看全部
  async getAllMenu() {
    try {
      return await this.menuRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // 查看单个
  async getOneMenu(id: number) {
    try {
      const menu = await this.menuRepository.findOneBy({ id });
      if (!menu) {
        throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
      }
      return menu;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
