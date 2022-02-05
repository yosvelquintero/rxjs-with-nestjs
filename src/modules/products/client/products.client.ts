import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ISale } from 'src/types';

import { SALES_LIST } from './sales';

@Injectable()
export class ProductsClient {
  getSales(): Observable<AxiosResponse<ISale[]>> {
    const source = of({
      data: SALES_LIST,
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    return source.pipe(delay(150));
  }
}
