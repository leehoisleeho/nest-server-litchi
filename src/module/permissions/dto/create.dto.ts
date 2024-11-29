// 创建dto
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty({ message: '权限名称不能为空' })
  permissions_name: string;

  @IsString()
  @IsNotEmpty({ message: '权限列表不能为空' })
  permissions_list: string;
}
