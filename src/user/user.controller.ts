import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  login(@Body() data) {
    return this.userService.login(data);
  }

  @Post('verify')
  async verify(@Body() body: { token: string }) {
    return await this.userService.verify(body.token);
  }
}
