import { HhDataProps } from './HhData.props';
import styles from './HhData.module.css';
import cn from 'classnames';
import React from 'react';
import { Card } from '..';
import RateIcon from './rate.svg';

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
          <div className={styles.salaryValue}>{juniorSalary}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.rateFilled} />
            <RateIcon />
            <RateIcon />
          </div>
        </div>
        <div className={styles.salaryItem}>
          <div className={styles.title}>Средний</div>
          <div className={styles.salaryValue}>{middleSalary}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.rateFilled} />
            <RateIcon className={styles.rateFilled} />
            <RateIcon />
          </div>
        </div>
        <div className={styles.salaryItem}>
          <div className={styles.title}>Профессионал</div>
          <div className={styles.salaryValue}>{seniorSalary}</div>
          <div className={styles.rate}>
            <RateIcon className={styles.rateFilled} />
            <RateIcon className={styles.rateFilled} />
            <RateIcon className={styles.rateFilled} />
          </div>
        </div>
      </Card>
    </div>
  );
};