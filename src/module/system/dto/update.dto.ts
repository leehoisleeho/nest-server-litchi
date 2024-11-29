// 创建dto
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsNotEmpty({ message: '系统名称不能为空' })
  system_name: string;

  @IsString()
  @IsNotEmpty({ message: '系统版本不能为空' })
  system_version: string;

  @IsString()
  system_logo_url: string;
}
