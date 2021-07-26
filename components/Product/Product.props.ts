import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ProductItem } from '../../interfaces/product.interface';

export interface ProductProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ProductItem;
}
