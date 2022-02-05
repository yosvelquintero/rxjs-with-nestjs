import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, fromEvent } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Injectable()
export class OnCloseInterceptor implements NestInterceptor {
  logger = new Logger(OnCloseInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const request: any = context.switchToHttp().getRequest() as Request;
    const close$ = fromEvent(request, 'close').pipe(
      tap(() => this.logger.log('Closed Event Fired')),
    );

    return next.handle().pipe(takeUntil(close$));
  }
}
