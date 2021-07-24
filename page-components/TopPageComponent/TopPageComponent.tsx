import { Advantages, HhData, Htag, Sort, Tag } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '../../interfaces/page.interface';
import { SortEnum } from '../../components/Sort/Sort.props';
import { useEffect, useReducer } from 'react';
import { sortReducer } from './sort.reducer';

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    {
      products,
      sort: SortEnum.Rating,
    }
  );

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  return (
    <>
      <div className={styles.header}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag size="m" color="gray">
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div>
        {sortedProducts &&
          sortedProducts.map((p) => <div key={p._id}>{p.title}</div>)}
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && (
        <>
          <div className={styles.hhHeader}>
            <Htag tag="h2">Вакансии - {page.category}</Htag>
            <Tag size="m" color="red">
              hh.ru
            </Tag>
          </div>
          <HhData {...page.hh} />
        </>
      )}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2">Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag="h2">Получаемые навыки</Htag>
      <div className={styles.skills}>
        {page.tags.map((t) => (
          <Tag className={styles.skillsItem} key={t} color="primary">
            {t}
          </Tag>
        ))}
      </div>
    </>
  );
};
