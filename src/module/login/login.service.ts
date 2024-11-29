import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Account } from '../../entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    try {
      const user = await this.accountRepository.findOne({
        where: {
          username: loginDto.username,
        },
      });

      if (!user) {
        throw new HttpException('账号不存在', HttpStatus.BAD_REQUEST);
      }

      const storedHash = user.password;
      if (storedHash !== loginDto.password) {
        throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
      }

      return {
        token_access: await this.jwtService.signAsync({
          id: user.id,
          username: user.username,
        }),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; // 重新抛出 HTTP 异常
      }
      // 处理其他类型的错误
      throw new HttpException('登录失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
