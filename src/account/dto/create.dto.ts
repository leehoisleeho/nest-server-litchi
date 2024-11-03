// 创建dto
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  @MinLength(5, { message: '用户名长度至少为5位' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(5, { message: '密码长度至少为5位' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '权限不能为空' })
  permission: string;
}
