import styles from './ButtonIcon.module.css';
import { ButtonIconProps, icons } from './ButtonIcon.props';
import cn from 'classnames';

export const ButtonIcon = ({
  color,
  icon,
  className,
  ...props
}: ButtonIconProps): JSX.Element => {
  const IconComponent = icons[icon];
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: color == 'primary',
        [styles.white]: color == 'white',
      })}
      {...props}
    >
      <IconComponent />
    </button>
  );
};
