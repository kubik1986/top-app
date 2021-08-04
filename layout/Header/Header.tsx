import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import Logo from '../logo.svg';
import { ButtonIcon } from '../../components';
import { motion, useReducedMotion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: '100%',
    },
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo className={styles.logo} />
      <ButtonIcon
        color="white"
        icon="burger"
        onClick={() => setIsOpened(true)}
        aria-label="Открыть меню"
      />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={'closed'}
        animate={isOpened ? 'opened' : 'closed'}
      >
        <Sidebar className={styles.sidebar} />
        <ButtonIcon
          className={styles.menuClose}
          color="white"
          icon="cross"
          onClick={() => setIsOpened(false)}
          aria-label="Закрыть меню"
        />
      </motion.div>
    </header>
  );
};
