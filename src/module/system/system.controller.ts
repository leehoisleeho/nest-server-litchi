import { Body, Controller, Get, Put } from '@nestjs/common';
import { SystemService } from './system.service';
import { UpdateDto } from './dto/update.dto';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  async getSystemInfo() {
    return this.systemService.getSystemInfo();
  }

  @Put()
  async updateSystemInfo(@Body() updateDto: UpdateDto) {
    return this.systemService.editSystemInfo(updateDto);
  }
}
