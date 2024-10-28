import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(private readonly jwtService: JwtService) {}
  async login(loginDto: LoginDto) {
    return {
      access_token: this.jwtService.sign({ ...loginDto }),
    };
  }
}
