import { HhDataProps } from './HhData.props';
import styles from './HhData.module.css';
import React from 'react';
import { Card } from '..';
import RateIcon from './rate.svg';
import { priceRu } from '../../helpers/helpers';

export const HhData = ({
  count,
  juniorSalary,
  middleSalary,
  seniorSalary,
}: HhDataProps): JSX.Element => {
  return (
    <div className={styles.hh}>
      <Card className={styles.count}>
        <div className={styles.title}>Всего вакансий</div>
        <div className={styles.countValue}>{count}</div>
      </Card>
      <Card className={styles.salary}>
        <div className={styles.salaryItem}>
          <div className={styles.title}>Начальный</div>
          <div className={styles.salaryValue}>{priceRu(juniorSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.rateFilled} aria-hidden="true" />
            <RateIcon aria-hidden="true" />
            <RateIcon aria-hidden="true" />
          </div>
        </div>
        <div className={styles.salaryItem}>
          <div className={styles.title}>Средний</div>
          <div className={styles.salaryValue}>{priceRu(middleSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.rateFilled} aria-hidden="true" />
            <RateIcon className={styles.rateFilled} aria-hidden="true" />
            <RateIcon aria-hidden="true" />
          </div>
        </div>
        <div className={styles.salaryItem}>
          <div className={styles.title}>Профессионал</div>
          <div className={styles.salaryValue}>{priceRu(seniorSalary)}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.rateFilled} aria-hidden="true" />
            <RateIcon className={styles.rateFilled} aria-hidden="true" />
            <RateIcon className={styles.rateFilled} aria-hidden="true" />
          </div>
        </div>
      </Card>
    </div>
  );
};
