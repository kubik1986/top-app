import styles from './AnchorBtn.module.css';
import { AnchorBtnProps } from './AnchorBtn.props';
import cn from 'classnames';

export const AnchorBtn = ({
  appearance,
  children,
  className,
  ...props
}: AnchorBtnProps): JSX.Element => {
  return (
    <a
      className={cn(styles.anchor, className, {
        [styles.primary]: appearance == 'primary',
        [styles.transparent]: appearance == 'transparent',
      })}
      {...props}
    >
      {children}
    </a>
  );
};
