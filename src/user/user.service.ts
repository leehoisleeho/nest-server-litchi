import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  // 登录
  async login(data: any) {
    try {
      const { username, password } = data;
      // 这里可以调用数据库查询用户信息
      const res = await this.usersRepository.findOneBy({ username: username });
      if (res.password !== password) {
        return {
          code: 1,
          message: '账号密码错误',
        };
      }
      const payload = { username: res.username, sub: res.id };
      const token = await this.jwtService.sign(payload);
      return {
        code: 0,
        message: '登录成功',
        data: res,
        token,
      };
    } catch (e) {
      return {
        code: 1,
        message: 'Something went wrong',
        data: e,
      };
    }
  }
  // 验证token
  async verify(token: string) {
    if (!token) {
      return {
        code: 1,
        message: 'token不存在',
      };
    }
    try {
      await this.jwtService.verify(token);
      return {
        code: 0,
        message: 'success',
      };
    } catch {
      return {
        code: 1,
        message: 'token不合法',
      };
    }
  }
}
