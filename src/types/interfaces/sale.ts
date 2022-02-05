import { EProducts } from '../enums/product';

export interface ISale {
  id: number;
  product: EProducts;
  financedAmount: number;
  installments: number;
}
