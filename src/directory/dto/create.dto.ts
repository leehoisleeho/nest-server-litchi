// 创建dto
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty({ message: '菜单名不能为空' })
  directory_name: string;

  @IsString()
  file_path: string;

  @IsString()
  @IsNotEmpty({ message: 'icon_name不能为空' })
  icon_name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'sort不能为空' })
  sort: number;

  @IsString()
  @IsNotEmpty({ message: 'icon_name不能为空' })
  isShow: string;

  @IsString()
  @IsNotEmpty({ message: 'router_path不能为空' })
  router_path: string;

  @IsString()
  @IsNotEmpty({ message: 'isMenu不能为空' })
  isMenu: string;
}
