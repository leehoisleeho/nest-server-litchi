// 创建dto
import { IsString, IsNumber } from 'class-validator';

export class UpdateDto {
  @IsString()
  menu_name: string;

  @IsString()
  key: string;

  @IsString()
  router_path: string;

  @IsString()
  isShow: string;

  @IsNumber()
  parentId: number;

  @IsNumber()
  sort: number;
}
