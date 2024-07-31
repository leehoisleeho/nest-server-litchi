import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class UploadService {
  async uploadImg(file: Express.Multer.File) {
    const filePath = path.join('/public/imgs', file.filename);
    return {
      code: 0,
      msg: '上传成功',
      filePath,
    };
  }
}
