// 创建dto
import { IsString, IsNumber } from 'class-validator';

export class UpdateDto {
  @IsString()
  directory_name: string;

  @IsString()
  file_path: string;

  @IsString()
  icon_name: string;

  @IsNumber()
  sort: number;

  @IsString()
  isShow: string;

  @IsString()
  router_path: string;

  @IsString()
  isMenu: string;
}
