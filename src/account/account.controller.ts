import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateUserDto } from './dto/create.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  // 创建用户
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.accountService.create(createUserDto);
  }
}
