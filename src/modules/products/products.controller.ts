import { Controller, Get, Param, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ISale } from 'src/types';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('sales/:product')
  getSalesByProduct(@Param('product') product: string): Observable<ISale[]> {
    return this.productsService.getSalesByProduct(product);
  }

  @Get('sales')
  getSales(
    @Query('order') order = 'ASC',
    @Query('limit') limit = 3,
  ): Observable<unknown[]> {
    return this.productsService.getSales(order, limit);
  }
}
