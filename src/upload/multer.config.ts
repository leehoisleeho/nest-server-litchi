// src/upload/multer.config.ts
import { extname } from 'path';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as path from 'path';
import { ensureDirectoryExistence } from '../utils';

const imgPath = path.join(__dirname, '../../public/imgs');
ensureDirectoryExistence(imgPath);
export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: imgPath, // 文件保存路径
    filename: async (req, file, callback) => {
      // 确认目录是否存在 不存在就创建目录
      await ensureDirectoryExistence(imgPath);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `img-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req: Request, file: Express.Multer.File, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('只允许上传jpg和png格式的图片'), false);
    }
    callback(null, true);
  },
};
