// 创建dto
import { IsString, MinLength, IsNumber } from 'class-validator';

export class updateDto {
  @IsString()
  @MinLength(5, { message: '用户名长度至少为5位' })
  username: string;

  @IsString()
  @MinLength(5, { message: '密码长度至少为5位' })
  password: string;

  @IsString()
  permission: string;

  @IsNumber()
  permissionsId: number;
}
