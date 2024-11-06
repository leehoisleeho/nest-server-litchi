import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreateDto } from './dto/create.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly PermissionsService: PermissionsService) {}
  @Post()
  create(@Body() createDto: CreateDto) {
    return this.PermissionsService.create(createDto);
  }
  // 删除权限
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.PermissionsService.delete(id);
  }
  // 获取权限列表
  @Get('findAll')
  findAll() {
    return this.PermissionsService.findAll();
  }
  // 查看权限详情
  @Get('findOne/:id')
  findOne(@Param('id') id: number) {
    return this.PermissionsService.findOne(id);
  }

  // 更新
  @Put(':id')
  update(@Param('id') id: number, @Body() data) {
    return this.PermissionsService.update(id, data);
  }
}
