import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';
import { Account } from '../entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import * as SHA256 from 'crypto-js/sha256';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}

  // 创建账号
  async create(data: CreateUserDto) {
    console.log;
    // 查看是否有重复账号
    const existAccount = await this.accountRepository.findOne({
      where: { username: data.username },
    });
    if (existAccount) {
      throw new HttpException('账号已存在', HttpStatus.BAD_REQUEST);
    }
    // 创建账号实体
    const newAccount = this.accountRepository.create({
      username: data.username,
      password: SHA256(data.password).toString(),
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      permissionsId: data.permissionsId,
    });
    try {
      await this.accountRepository.save(newAccount);
      return '账号创建成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //删除账号
  async delete(id: number) {
    console.log(id);
    try {
      const account = await this.accountRepository.findOne({
        where: { id },
      });
      if (!account) {
        throw new HttpException('账号不存在', HttpStatus.BAD_REQUEST);
      }
      await this.accountRepository.delete(id);
      return '删除成功';
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 查看所有账号
  async findAll() {
    try {
      const accounts = await this.accountRepository.find({
        relations: ['permissions'],
      });
      return accounts;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 查看账号详情
  async findOne(id: number) {
    try {
      const account = await this.accountRepository.findOne({
        relations: ['permissions'],
        where: { id },
      });
      if (!account) {
        throw new HttpException('账号不存在', HttpStatus.BAD_REQUEST);
      }
      return account;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 编辑
  async update(id: number, data: updateDto) {
    try {
      const account = await this.accountRepository.findOne({
        where: { id },
      });
      if (!account) {
        throw new HttpException('账号不存在', HttpStatus.BAD_REQUEST);
      }
      await this.accountRepository.update(id, {
        ...data,
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
