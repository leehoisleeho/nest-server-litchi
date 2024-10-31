import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuEntity } from '../entities/menu.entity';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
  ) {}

  async create(createDto: CreateDto) {
    try {
      const createdAt = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const menu = await this.menuRepository.findOne({
        where: {
          menu_name: createDto.menu_name,
        },
      });
      if (menu) {
        throw new HttpException('菜单已存在', HttpStatus.BAD_REQUEST);
      }
      await this.menuRepository.save({
        ...createDto,
        createdAt,
      });
      return '创建成功';
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.menuRepository.find();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number) {
    try {
      const menu = await this.menuRepository.findOne({
        relations: ['parent'],
        where: {
          id,
        },
      });
      if (!menu) {
        throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
      }
      return menu;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateMenuDto: UpdateDto) {
    try {
      const menu = await this.menuRepository.findOneBy({ id });
      if (!menu) {
        throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
      }
      const updateMenu = Object.assign(menu, updateMenuDto);
      await this.menuRepository.save({
        ...updateMenu,
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
      return '更新成功';
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
}
