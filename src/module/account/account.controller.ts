import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Get,
  Put,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateUserDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  // 创建用户
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.accountService.create(createUserDto);
  }
  // 删除账号
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.accountService.delete(id);
  }
  // 查找所有账号
  @Get('findAll')
  async findAll() {
    return this.accountService.findAll();
  }

  // 查看账号详情
  @Get('/find/:id')
  async findOne(@Param('id') id: number) {
    return this.accountService.findOne(id);
  }

  // 编辑账号
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: updateDto) {
    return this.accountService.update(id, data);
  }
}
