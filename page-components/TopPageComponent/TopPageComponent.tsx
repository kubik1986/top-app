import { Card, HhData, Htag, Tag } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '../../interfaces/page.interface';

export const TopPageComponent = ({
  page,
  products,
  firstCategory,
}: TopPageComponentProps): JSX.Element => {
  return (
    <>
      <div className={styles.header}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag size="m" color="gray">
            {products.length}
          </Tag>
        )}
        <span>Сортировка</span>
      </div>
      <div>
        {products && products.map((p) => <div key={p._id}>{p.title}</div>)}
      </div>
      <div className={styles.hhHeader}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag size="m" color="red">
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && <HhData {...page.hh} />}
    </>
  );
};
