import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create.dto';
import { Account } from '../entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}

  // 创建账号
  async create(data: CreateUserDto) {
    const newAccount = this.accountRepository.create({
      ...data,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });

    try {
      await this.accountRepository.save(newAccount);
      return '账号创建成功';
    } catch (error) {
      throw new HttpException('创建账号失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
