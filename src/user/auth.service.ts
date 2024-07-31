import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
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
