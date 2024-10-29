import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('create')
  create(@Body() data: CreateDto) {
    return this.menuService.create(data);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.menuService.delete(id);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() data: UpdateDto) {
    return this.menuService.update(id, data);
  }
  @Get('all')
  getAllMenu() {
    return this.menuService.getAllMenu();
  }
  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.menuService.getOneMenu(id);
  }
}
