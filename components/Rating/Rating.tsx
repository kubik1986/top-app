import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import StarIcon from './star.svg';
import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
} from 'react';

export const Rating = forwardRef(
  (
    {
      isEditable = false,
      rating,
      setRating,
      error,
      className,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );

    useEffect(() => {
      constructRating(rating);
    }, [rating]);

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
        return (
          <StarIcon
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            tabIndex={isEditable ? 0 : -1}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(i + 1)}
            onKeyDown={(e: KeyboardEvent<SVGElement>) =>
              isEditable && onSpaceDown(i + 1, e)
            }
          />
        );
      });
      setRatingArray(updatedArray);
    };

    const changeDisplay = (i: number) => {
      if (!isEditable) {
        return;
      }
      constructRating(i);
    };

    const onClick = (i: number) => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(i);
    };

    const onSpaceDown = (i: number, e: KeyboardEvent<SVGElement>) => {
      if (e.code != 'Space' || !setRating) {
        return;
      }
      setRating(i);
    };

    return (
      <div
        {...props}
        ref={ref}
        className={cn(className, {
          [styles.error]: error,
        })}
      >
        <div className={styles.rating}>
          {ratingArray.map((r, i) => (
            <span key={i}>{r}</span>
          ))}
        </div>
        {error && <div className={styles.errorMsg}>{error.message}</div>}
      </div>
    );
  }
);
