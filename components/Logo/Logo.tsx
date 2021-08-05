import { LogoProps } from './Logo.props';
import styles from './Logo.module.css';
import cn from 'classnames';
import LogoIcon from './logo.svg';

export const Logo = ({
  className,
  isLink = false,
  ...props
}: LogoProps): JSX.Element => {
  return (
    <a
      className={cn(className, styles.logo)}
      href={isLink ? '/' : undefined}
      {...props}
    >
      <LogoIcon
        className={styles.logoImg}
        role="img"
        focusable="false"
        aria-label={
          isLink
            ? 'Логотип Owl Top - переход на главную страницу'
            : 'Логотип Owl Top'
        }
      />
    </a>
  );
};
