import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

interface ErrorResponse {
  code: number;
  timestamp: string;
  path: string;
  method: string;
  message: string;
  httpstatus: number;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 获取状态码和错误信息
    let status: number;
    let message: string;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || exception.message;
    } else if (exception instanceof Error) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    // 构建错误响应对象
    const errorResponse: ErrorResponse = {
      httpstatus: response.statusCode,
      code: 1,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
    };

    // 发送响应
    response.status(status).json(errorResponse);
  }
}
