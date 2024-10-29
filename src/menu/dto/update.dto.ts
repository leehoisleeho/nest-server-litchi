// 创建dto
import { IsString, IsNumber } from 'class-validator';

export class UpdateDto {
  @IsString()
  menu_name: string;

  @IsString()
  key: string;

  @IsString()
  icon_name: string;

  @IsNumber()
  sort: number;

  @IsString()
  isShow: string;
}
