import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  filter,
  toArray,
  throwIfEmpty,
  switchMap,
  take,
  map,
} from 'rxjs/operators';

import { ProductsClient } from './client/products.client';
import sortBy from '../../operators/sortBy';
import { ISale } from 'src/types';

@Injectable()
export class ProductsService {
  constructor(private readonly productsClient: ProductsClient) {}

  getSalesByProduct(product: string): Observable<ISale[]> {
    return this.productsClient.getSales().pipe(
      switchMap((res) => res.data),
      filter((item) => item.product === product),
      throwIfEmpty(() => new NotFoundException()),
      toArray(),
    );
  }

  getSales(order: string, limit: number): Observable<ISale[]> {
    return this.productsClient.getSales().pipe(
      map((res) => res.data),
      sortBy(order, 'financedAmount'),
      take(limit),
      toArray(),
    );
  }
}
