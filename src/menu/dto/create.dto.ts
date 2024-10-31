// 创建dto
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty({ message: '菜单名不能为空' })
  menu_name: string;

  @IsString()
  @IsNotEmpty({ message: 'file_path不能为空' })
  file_path: string;

  @IsString()
  @IsNotEmpty({ message: 'router_path不能为空' })
  router_path: string;

  @IsString()
  @IsNotEmpty({ message: 'isShow不能为空' })
  isShow: string;

  @IsNumber()
  @IsNotEmpty({ message: 'parent不能为空' })
  parentId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'sort不能为空' })
  sort: number;
}
