import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Account } from '../entities/account.entity';
import { DirectoryEntity } from '../entities/directory.entity';
import { MenuEntity } from '../entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DataSource } from 'typeorm';
import * as dayjs from 'dayjs';
import * as SHA256 from 'crypto-js/sha256';

// 定义接口
interface DirectoryConfig {
  directory_name: string;
  router_path: string;
  file_path: string;
  icon_name?: string;
  sort: number;
  isShow: '0' | '1';
  isMenu: '0' | '1';
}

interface MenuConfig {
  menu_name: string;
  router_path: string;
  file_path: string;
  icon_name?: string;
  sort: number;
  isShow: '0' | '1';
  isMenu: '0' | '1';
  parentId: number;
}

@Injectable()
export class InitService {
  // 定义默认配置
  private readonly DEFAULT_DIRECTORIES: DirectoryConfig[] = [
    {
      directory_name: '首页',
      router_path: '/',
      file_path: '/basic/index',
      icon_name: 'HomeOutlined',
      sort: 9999,
      isShow: '0',
      isMenu: '1',
    },
    {
      directory_name: '系统配置',
      router_path: '/system',
      file_path: '',
      icon_name: 'SettingOutlined',
      sort: 9998,
      isShow: '0',
      isMenu: '0',
    },
  ];

  private readonly DEFAULT_MENUS = [
    {
      menu_name: '菜单管理',
      router_path: '/menu',
      file_path: '/basic/menu',
      sort: 3,
      isShow: '1',
      isMenu: '1',
    },
    {
      menu_name: '账号管理',
      router_path: '/account',
      file_path: '/basic/account',
      sort: 1,
      isShow: '1',
      isMenu: '1',
    },
    {
      menu_name: '权限管理',
      router_path: '/permissions',
      file_path: '/basic/permissions',
      sort: 2,
      isShow: '1',
      isMenu: '1',
    },
  ];

  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(DirectoryEntity)
    private readonly directoryRepository: Repository<DirectoryEntity>,
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
    private dataSource: DataSource,
  ) {}

  async initSystem() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.initAccount();
      await this.initDirectory();
      await this.initMenu();

      await queryRunner.commitTransaction();
      return {
        success: true,
        message: '系统初始化成功',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        {
          success: false,
          message: error.message || '系统初始化失败',
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    } finally {
      await queryRunner.release();
    }
  }

  private async initAccount() {
    const account = await this.accountRepository.findOne({
      where: {
        username: 'admin',
      },
    });

    if (account) {
      return;
    }

    const newAccount = this.accountRepository.create({
      username: 'admin',
      password: SHA256('admin').toString(),
      permission: 'all',
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });

    await this.accountRepository.save(newAccount);
  }

  private async initDirectory() {
    const directoryNames = this.DEFAULT_DIRECTORIES.map(
      (dir) => dir.directory_name,
    );

    const existingDirectories = await this.directoryRepository.find({
      where: {
        directory_name: In(directoryNames),
      },
    });

    if (existingDirectories.length === directoryNames.length) {
      return;
    }

    const existingNames = new Set(
      existingDirectories.map((dir) => dir.directory_name),
    );
    const directoriesToCreate = this.DEFAULT_DIRECTORIES.filter(
      (dir) => !existingNames.has(dir.directory_name),
    );

    const newDirectories = directoriesToCreate.map((dir) => ({
      ...dir,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }));

    await this.directoryRepository.save(newDirectories);
  }

  private async initMenu() {
    const menuNames = this.DEFAULT_MENUS.map((menu) => menu.menu_name);
    const existingMenus = await this.menuRepository.find({
      where: {
        menu_name: In(menuNames),
      },
    });

    if (existingMenus.length === menuNames.length) {
      return;
    }

    const directory = await this.directoryRepository.findOne({
      where: {
        directory_name: '系统配置',
      },
    });

    if (!directory) {
      throw new HttpException('系统配置目录不存在', HttpStatus.BAD_REQUEST);
    }

    const existingMenuNames = new Set(
      existingMenus.map((menu) => menu.menu_name),
    );
    const menusToCreate = this.DEFAULT_MENUS.filter(
      (menu) => !existingMenuNames.has(menu.menu_name),
    );

    const newMenus = menusToCreate.map((menu) => ({
      ...menu,
      parentId: directory.id,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }));

    await this.menuRepository.save(newMenus);
  }

  // 添加检查初始化状态的方法
  async checkInitStatus() {
    const adminExists = await this.accountRepository.findOne({
      where: { username: 'admin' },
    });

    const directoryNames = this.DEFAULT_DIRECTORIES.map(
      (dir) => dir.directory_name,
    );
    const directories = await this.directoryRepository.find({
      where: { directory_name: In(directoryNames) },
    });

    const menuNames = this.DEFAULT_MENUS.map((menu) => menu.menu_name);
    const menus = await this.menuRepository.find({
      where: { menu_name: In(menuNames) },
    });

    return {
      isInitialized: {
        account: !!adminExists,
        directory: directories.length === directoryNames.length,
        menu: menus.length === menuNames.length,
      },
      details: {
        accountCount: adminExists ? 1 : 0,
        directoryCount: directories.length,
        menuCount: menus.length,
      },
    };
  }
}
