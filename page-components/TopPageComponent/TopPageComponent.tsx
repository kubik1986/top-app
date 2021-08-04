import { Advantages, HhData, Htag, Product, Sort, Tag } from '../../components';
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

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products });
  }, [products]);

  return (
    <>
      <div className={styles.header}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag
            size="m"
            color="gray"
            aria-label={products.length + ' элементов'}
          >
            {products.length}
          </Tag>
        )}
        <Sort className={styles.sort} sort={sort} setSort={setSort} />
      </div>
      {products.length > 0 && (
        <section>
          <h2 className="visually-hidden">
            {`Продукты в разделе "${page.category}"`}
          </h2>
          <ul className={styles.productsList}>
            {sortedProducts &&
              sortedProducts.map((p) => (
                <li className={styles.productsItem} key={p._id}>
                  <Product layout product={p} />
                </li>
              ))}
          </ul>
        </section>
      )}
      {firstCategory == TopLevelCategory.Courses && page.hh && (
        <section>
          <div className={styles.hhHeader}>
            <Htag tag="h2">Вакансии - {page.category}</Htag>
            <Tag size="m" color="red">
              hh.ru
            </Tag>
          </div>
          <HhData {...page.hh} />
        </section>
      )}
      {page.advantages &&
        page.advantages.length > 0 &&
        page.advantages[0].description && (
          <section>
            <Htag tag="h2">Преимущества</Htag>
            <Advantages advantages={page.advantages} />
          </section>
        )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <section>
        <Htag tag="h2">Получаемые навыки</Htag>
        <div className={styles.skills}>
          {page.tags.map((t) => (
            <Tag key={t} color="primary">
              {t}
            </Tag>
          ))}
        </div>
      </section>
    </>
  );
};
