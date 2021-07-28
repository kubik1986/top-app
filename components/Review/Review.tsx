import { ReviewProps } from './Review.props';
import styles from './Review.module.css';
import cn from 'classnames';
import UserIcon from './user.svg';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Rating } from '../Rating/Rating';
import { Ptag } from '../Ptag/Ptag';
import { Divider } from '../Divider/Divider';

export const Review = ({
  review,
  className,
  ...props
}: ReviewProps): JSX.Element => {
  const { name, title, description, createdAt, rating } = review;

  return (
    <div className={cn(styles.reviewItem, className)} {...props}>
      <UserIcon className={styles.userIcon} />
      <div className={styles.header}>
        <span className={styles.name}>{name}:</span>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.date}>
        {format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
      </div>
      <Rating className={styles.rating} rating={rating} />
      <Ptag className={styles.description} textSize="s">
        {description}
      </Ptag>
      <Divider className={styles.divider} />
    </div>
  );
};
