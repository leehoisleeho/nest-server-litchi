import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Get('all')
  findAll() {
    return this.menuService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.menuService.findOne(id);
  }
  @Post()
  createMenu(@Body() createDto: CreateDto) {
    return this.menuService.create(createDto);
  }
  @Put(':id')
  updateMenu(@Param('id') id: number, @Body() updateDto: UpdateDto) {
    return this.menuService.update(id, updateDto);
  }
  @Delete(':id')
  deleteMenu(@Param('id') id: number) {
    return this.menuService.delete(id);
  }
}
