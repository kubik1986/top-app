import {
  TopLevelCategory,
  TopPageModel,
} from '../../interfaces/page.interface';
import { ProductItem } from '../../interfaces/product.interface';

export interface TopPageComponentProps extends Record<string, unknown> {
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductItem[];
}
