import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface Response {
  code: number;
  error?: any;
  response?: any;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    return next.handle().pipe(
      map((data) => ({
        code: 200,
        response: data,
      })),
      catchError((err) => {
        const response: Response = {
          code: 500,
          error: err.message,
        };
        return throwError(() => response);
      }),
    );
  }
}
