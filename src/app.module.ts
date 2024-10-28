import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createDatabaseConfig } from './config/database.config';
import { AccountModule } from './account/account.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    // 配置环境变量
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // 配置数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        createDatabaseConfig(configService),
    }),
    // 配置静态文件目录
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // 配置静态文件目录
      serveRoot: '/public', // 静态文件访问前缀
    }),
    UploadModule,
    AccountModule,
  ],
  controllers: [],
  providers: [
    // 全局异常过滤器
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    // 全局响应拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
