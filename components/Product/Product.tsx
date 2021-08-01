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
import { ForwardedRef, forwardRef, useRef, useState } from 'react';
import { Review } from '../Review/Review';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { motion } from 'framer-motion';

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewsOpened, setIsReviewsOpened] = useState<boolean>(false);
      const reviewRef = useRef<HTMLDivElement>(null);

      const variants = {
        visible: {
          opacity: 1,
          height: 'auto',
          overflow: 'visible',
          marginTop: -10,
        },
        hidden: {
          opacity: 0,
          height: 0,
          overflow: 'hidden',
          marginTop: 0,
        },
      };

      const scrollToReview = () => {
        setIsReviewsOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      };

      return (
        <div
          className={cn(styles.productsItem, className)}
          {...props}
          ref={ref}
        >
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
                <a
                  href="#ref"
                  className={styles.reviewsCount}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToReview();
                  }}
                >
                  {product.reviewCount}
                  {' ' +
                    declOfNumber(product.reviewCount, [
                      'отзыв',
                      'отзыва',
                      'отзывов',
                    ])}
                </a>
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
                    <div className={styles.advText}>
                      {product.disAdvantages}
                    </div>
                  </div>
                )}
              </div>
            )}
            <Divider className={styles.divider2} />
            <div className={styles.actions}>
              <Button appearance="primary">Узнать подробнее</Button>
              <Button
                className={styles.reviewsBtn}
                appearance="transparent"
                arrow={isReviewsOpened ? 'down' : 'right'}
                onClick={() => setIsReviewsOpened(!isReviewsOpened)}
              >
                {isReviewsOpened ? 'Скрыть отзывы' : 'Читать отзывы'}
              </Button>
            </div>
          </Card>
          <motion.div
            className={styles.reviewsWrapper}
            animate={isReviewsOpened ? 'visible' : 'hidden'}
            variants={variants}
            initial="hidden"
          >
            <Card color="blue" className={cn(styles.reviews)} ref={reviewRef}>
              <div className={styles.reviewsList}>
                {product.reviews.map((r) => (
                  <Review key={r._id} review={r} />
                ))}
              </div>
              <ReviewForm productId={product._id} />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);
