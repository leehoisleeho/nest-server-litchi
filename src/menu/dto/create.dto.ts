// 创建dto
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDto {
  @IsString()
  @IsNotEmpty({ message: '菜单名不能为空' })
  menu_name: string;

  @IsString()
  @IsNotEmpty({ message: 'key不能为空' })
  key: string;

  @IsString()
  @IsNotEmpty({ message: 'icon_name不能为空' })
  icon_name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'sort不能为空' })
  sort: number;

  @IsString()
  @IsNotEmpty({ message: 'icon_name不能为空' })
  isShow: string;
}
