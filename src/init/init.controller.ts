import { Controller, Get, Post } from '@nestjs/common';
import { InitService } from './init.service';

@Controller('init')
export class InitController {
  constructor(private readonly initService: InitService) {}
  @Post()
  async initSystem() {
    return this.initService.initSystem();
  }
}
