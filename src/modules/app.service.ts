import { Injectable } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { tap, take, finalize } from 'rxjs/operators';

@Injectable()
export class AppService {
  getLongRequest(): Observable<number> {
    const source = interval(500);
    return source.pipe(
      take(5),
      tap((index) => console.log(++index)),
      finalize(() => console.log('Finished Long Request')),
    );
  }
}
