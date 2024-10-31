import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
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
import { LoginModule } from './login/login.module';
import { JwtMiddleware } from 'src/middleware/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { DirectoryModule } from './directory/directory.module';
import { MenuModule } from './menu/menu.module';

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
    // JwtModule 配置，使用 ConfigService 获取密钥
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        expiresIn: configService.get<string>('JWT_EXPIRATION_TIME'),
      }),
    }),
    UploadModule,
    AccountModule,
    LoginModule,
    DirectoryModule,
    MenuModule,
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
export class AppModule {
  // 自定义中间件 token 校验
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude({ path: 'login', method: RequestMethod.ALL }) // 排除 '/login'
      .exclude({ path: 'directory/all', method: RequestMethod.GET }) // 排除 动态侧边栏请求
      .forRoutes('*'); // 应用于除上述路由外的所有路由
  }
}
