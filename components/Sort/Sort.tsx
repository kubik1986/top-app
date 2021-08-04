import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import cn from 'classnames';
import SortIcon from './sort.svg';

export const Sort = ({
  sort,
  setSort,
  className,
  ...props
}: SortProps): JSX.Element => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <span className={styles.ariaLabelSort} id="ariaLabelSort">
        Сортировка
      </span>
      <button
        id="ariaLabelRating"
        className={cn(styles.button, {
          [styles.active]: sort == SortEnum.Rating,
        })}
        type="button"
        onClick={() => setSort(SortEnum.Rating)}
        aria-selected={sort == SortEnum.Rating}
        aria-labelledby="ariaLabelSort ariaLabelRating"
      >
        <SortIcon className={styles.sortIcon} aria-hidden="true" />
        По рейтингу
      </button>
      <button
        id="ariaLabelPrice"
        className={cn(styles.button, {
          [styles.active]: sort == SortEnum.Price,
        })}
        type="button"
        onClick={() => setSort(SortEnum.Price)}
        aria-selected={sort == SortEnum.Price}
        aria-labelledby="ariaLabelSort ariaLabelPrice"
      >
        <SortIcon className={styles.sortIcon} aria-hidden="true" />
        По цене
      </button>
    </div>
  );
};
