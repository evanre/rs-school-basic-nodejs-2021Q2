import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { fileLog } from './fileLog';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const { method, url, body, query } = context
      .switchToHttp()
      .getRequest<Request>();
    const { statusCode } = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - now;

        const str = `[${method}] ${url} : ${statusCode} : Body=${JSON.stringify(
          body,
        )} : Query=${JSON.stringify(query)} [${time}ms]\n`;
        fileLog('info', str);
        process.stdout.write(str);
      }),
    );
  }
}
