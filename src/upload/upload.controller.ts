import {
  UploadedFile,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer.config';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('img')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadImg(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadImg(file);
  }
}
