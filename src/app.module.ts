import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UploadModule } from './module/upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createDatabaseConfig } from './config/database.config';
import { AccountModule } from './module/account/account.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoginModule } from './module//login/login.module';
import { JwtMiddleware } from 'src/common/middleware/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { DirectoryModule } from './module//directory/directory.module';
import { MenuModule } from './module//menu/menu.module';
import { InitModule } from './module//init/init.module';
import { PermissionsModule } from './module/permissions/permissions.module';
import { SystemModule } from './module/system/system.module';

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
    InitModule,
    PermissionsModule,
    SystemModule,
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
      .exclude({ path: 'login', method: RequestMethod.ALL }) // 排除登录请求
      .exclude({ path: 'directory/all', method: RequestMethod.GET }) // 排除动态侧边栏请求，路由表里要加载动态菜单
      .exclude({ path: 'account/create', method: RequestMethod.ALL }) // 排除动态菜单请求
      .exclude({ path: 'init', method: RequestMethod.ALL }) // 排除动态菜单请求
      .exclude({ path: 'system', method: RequestMethod.ALL }) // 排除系统信息接口
      .forRoutes('*'); // 应用于除上述路由外的所有路由
  }
}
