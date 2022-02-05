import { Observable, pipe, UnaryFunction } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ISale } from 'src/types';

export default function sortBy(
  order: string,
  key: string,
): UnaryFunction<Observable<ISale[]>, Observable<ISale>> {
  return pipe(
    switchMap((arr: ISale[]) =>
      arr.sort((a, b): number =>
        order === 'DESC' ? b[key] - a[key] : a[key] - b[key],
      ),
    ),
  );
}
