import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class UploadService {
  // 上传图片
  async uploadImg(file: Express.Multer.File) {
    try {
      const filePath = path.join('/public/images', file.filename);
      return {
        filePath,
      };
    } catch (e) {
      throw new Error(e.message);
    }
  }
  // 删除图片
  async deleteImg(data: string) {
    const filePath = path.join(__dirname, '../../', data);
    try {
      // 检查文件是否存在
      await fs.access(filePath);
      // 删除图片
      await fs.unlink(filePath);
      return '删除成功';
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
