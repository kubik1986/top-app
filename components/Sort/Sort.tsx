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
      <button
        className={cn(styles.button, {
          [styles.active]: sort == SortEnum.Rating,
        })}
        type="button"
        onClick={() => setSort(SortEnum.Rating)}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </button>
      <button
        className={cn(styles.button, {
          [styles.active]: sort == SortEnum.Price,
        })}
        type="button"
        onClick={() => setSort(SortEnum.Price)}
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </button>
    </div>
  );
};
