import { ratingComparator, priceComparator } from './../../helpers/helpers';
import { SortEnum } from '../../components/Sort/Sort.props';
import { ProductItem } from '../../interfaces/product.interface';

export type SortActions =
  | { type: SortEnum.Rating }
  | { type: SortEnum.Price }
  | { type: 'reset'; initialState: ProductItem[] };

export interface SortReducerState {
  sort: SortEnum;
  products: ProductItem[];
}

export const sortReducer = (
  state: SortReducerState,
  action: SortActions
): SortReducerState => {
  switch (action.type) {
    case SortEnum.Rating:
      return {
        sort: SortEnum.Rating,
        products: state.products.sort(ratingComparator),
      };
    case SortEnum.Price:
      return {
        sort: SortEnum.Price,
        products: state.products.sort(priceComparator),
      };
    case 'reset':
      return {
        sort: SortEnum.Rating,
        products: action.initialState.sort(ratingComparator),
      };
    default:
      throw new Error('Неверный тип сортировки');
  }
};
