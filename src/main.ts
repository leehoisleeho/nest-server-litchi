import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 启用CORS
  const corsOptions: CorsOptions = {
    origin: '*', // 可以根据需要设置为特定的域名或数组
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  };
  app.enableCors(corsOptions); // 启用CORS

  const port = process.env.PORT;
  await app.listen(port);
}
bootstrap();
