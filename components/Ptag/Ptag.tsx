import { PtagProps } from './Ptag.props';
import styles from './Ptag.module.css';
import cn from 'classnames';

export const Ptag = ({
  textSize = 'm',
  children,
  className,
  ...props
}: PtagProps): JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.s]: textSize == 's',
        [styles.m]: textSize == 'm',
        [styles.l]: textSize == 'l',
      })}
      {...props}
    >
      {children}
    </p>
  );
};
