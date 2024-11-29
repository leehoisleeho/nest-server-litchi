import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { DirectoryService } from './directory.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@Controller('directory')
export class MenuController {
  constructor(private readonly directoryService: DirectoryService) {}

  @Post('create')
  create(@Body() data: CreateDto) {
    return this.directoryService.create(data);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.directoryService.delete(id);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() data: UpdateDto) {
    return this.directoryService.update(id, data);
  }
  @Get('all')
  getAllMenu() {
    return this.directoryService.getAllMenu();
  }
  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.directoryService.getOneMenu(id);
  }
}
