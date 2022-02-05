import { Injectable, Logger } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { tap, take, finalize } from 'rxjs/operators';

@Injectable()
export class AppService {
  logger = new Logger(AppService.name);
  getLongRequest(): Observable<number> {
    const source = interval(500);
    return source.pipe(
      take(5),
      tap((index) => this.logger.log(++index)),
      finalize(() => this.logger.log('Finished Long Request')),
    );
  }
}
