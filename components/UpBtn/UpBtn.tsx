import styles from './UpBtn.module.css';
import { useScrollY } from '../../hooks/useScrollY';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const UpBtn = (): JSX.Element => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight });
  }, [y, controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      className={styles.upBtn}
      animate={controls}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon
        color="primary"
        icon="up"
        onClick={scrollToTop}
        aria-label="Наверх"
      />
    </motion.div>
  );
};
