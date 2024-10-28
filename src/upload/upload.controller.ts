import {
  UploadedFile,
  Controller,
  Post,
  UseInterceptors,
  Delete,
  Query,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer.config';

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload/img')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadImg(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadImg(file);
  }
  @Delete('delete/img')
  async delete(@Query('filePath') filePath: string) {
    return await this.uploadService.deleteImg(filePath);
  }
}
