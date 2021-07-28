import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ReviewItem } from '../../interfaces/product.interface';

export interface ReviewProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  review: ReviewItem;
}
