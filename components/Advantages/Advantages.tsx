import { AdvantagesProps } from './Advantages.props';
import styles from './Advantages.module.css';
import cn from 'classnames';
import React from 'react';
import CheckIcon from './check.svg';

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <div className={styles.advantagesList}>
      {advantages.map((a) => (
        <div key={a._id} className={styles.advantagesItem}>
          <CheckIcon />
          <div className={styles.title}>{a.title}</div>
          {a.description && (
            <div className={styles.description}>{a.description}</div>
          )}
        </div>
      ))}
    </div>
  );
};
