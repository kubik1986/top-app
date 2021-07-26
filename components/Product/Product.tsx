import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import { Card } from '../Card/Card';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Htag } from '../Htag/Htag';
import { Ptag } from '../Ptag/Ptag';
import { Button } from '../Button/Button';
import { declOfNumber, priceRu } from '../../helpers/helpers';
import { Divider } from '../Divider/Divider';
import Image from 'next/image';

export const Product = ({
  product,
  className,
  ...props
}: ProductProps): JSX.Element => {
  return (
    <Card className={styles.product}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image
            className={styles.logoImg}
            src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <Htag className={styles.title} tag="h3">
          {product.title}
        </Htag>
        <div className={styles.categories}>
          {product.categories.map((c) => (
            <Tag key={c} color="transparent">
              {c}
            </Tag>
          ))}
        </div>
      </div>
      <div className={styles.priceWrapper}>
        <div className={styles.label}>Цена</div>
        <div className={styles.price}>
          {priceRu(product.price)}
          {product.oldPrice && (
            <Tag className={styles.discount} color="green">
              {priceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.label}>В кредит</div>
        <div className={styles.credit}>
          {priceRu(product.credit)}
          <span className={styles.month}>/мес</span>
        </div>
        <div className={styles.label}>
          {product.reviewCount}{' '}
          {declOfNumber(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
        </div>
        <Rating
          className={styles.rating}
          rating={product.reviewAvg ?? product.initialRating}
        />
      </div>
      <Divider className={styles.divider1} />
      <Ptag className={styles.description}>{product.description}</Ptag>
      <div className={styles.features}>
        <dl className={styles.featuresList}>
          {product.characteristics.map((c, i) => (
            <div key={i} className={styles.featuresItem}>
              <dt className={styles.featureName}>{c.name}</dt>
              <dd className={styles.featureValue}>{c.value}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.tags}>
          {product.tags.map((t) => (
            <Tag key={t} color="transparent">
              {t}
            </Tag>
          ))}
        </div>
      </div>
      {(product.advantages || product.disAdvantages) && (
        <div className={styles.advBlock}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Преимущества</div>
              <div className={styles.advText}>{product.advantages}</div>
            </div>
          )}
          {product.disAdvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.advTitle}>Недостатки</div>
              <div className={styles.advText}>{product.disAdvantages}</div>
            </div>
          )}
        </div>
      )}
      <Divider className={styles.divider2} />
      <div className={styles.actions}>
        <Button appearance="primary">Узнать подробнее</Button>
        <Button appearance="transparent" arrow={'right'}>
          Читать отзывы
        </Button>
      </div>
    </Card>
  );
};
