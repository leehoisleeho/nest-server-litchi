import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
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
      permission: data.permission,
    });
    try {
      await this.accountRepository.save(newAccount);
      return '账号创建成功';
    } catch (error) {
      throw new HttpException('创建账号失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
