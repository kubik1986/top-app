import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import cn from 'classnames';
import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
  useRef,
} from 'react';

export const Rating = forwardRef(
  (
    {
      isEditable = false,
      rating,
      setRating,
      error,
      className,
      tabIndex,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    const ratingArrayRef = useRef<(SVGElement | null)[]>([]);

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    const computeTabindex = (rating: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!rating && i == 0) {
        return tabIndex ?? 0;
      }
      if (rating == i + 1) {
        return tabIndex ?? 0;
      }
      return -1;
    };

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
        let fill = '#E2E2E2';
        const diff = currentRating - i;
        const offset = Math.round(diff * 100) + '%';
        if (i < currentRating) {
          fill = 'var(--primary)';
        }
        if (diff > 0 && diff < 1) {
          fill = `url(#gradient${offset})`;
        }

        return (
          <svg
            key={i}
            className={cn(styles.star, {
              [styles.editable]: isEditable,
            })}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="#E2E2E2"
            xmlns="http://www.w3.org/2000/svg"
            tabIndex={computeTabindex(rating, i)}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onClick(i + 1)}
            onMouseDown={(e) => e.preventDefault()}
            onKeyDown={handleKey}
            ref={(r) => ratingArrayRef.current?.push(r)}
            role={isEditable ? 'radio' : 'presentation'}
            aria-checked={isEditable ? rating == i + 1 : undefined}
            aria-label={isEditable ? (i + 1).toString() : undefined}
          >
            {diff > 0 && diff < 1 && (
              <defs>
                <linearGradient id={'gradient' + offset}>
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset={offset} stopColor="var(--primary)" />
                  <stop offset={offset} stopColor="#E2E2E2" />
                  <stop offset="100%" stopColor="#E2E2E2" />
                </linearGradient>
              </defs>
            )}
            <path
              d="M19.9477 7.55686C19.816 7.13427 19.4568 6.83508 19.0335 6.79511L13.2601 6.24816L10.9784 0.673859C10.81 0.264321 10.4267 0 10 0C9.57337 0 9.18991 0.264321 9.02252 0.673859L6.74084 6.24816L0.966519 6.79511C0.543233 6.83587 0.184799 7.13507 0.0523506 7.55686C-0.0793348 7.97946 0.0422796 8.44298 0.362414 8.73596L4.72665 12.7293L3.43985 18.6434C3.34571 19.0782 3.50745 19.5279 3.85322 19.7887C4.03908 19.9296 4.25743 20 4.47655 20C4.66485 20 4.8533 19.9478 5.0216 19.8427L10 16.7364L14.9775 19.8427C15.3427 20.0704 15.8018 20.0495 16.1468 19.7887C16.4926 19.5279 16.6543 19.0782 16.5602 18.6434L15.2734 12.7293L19.6376 8.73596C19.9576 8.44298 20.0794 7.98041 19.9477 7.55686Z"
              fill={fill}
            />
          </svg>
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

    const handleKey = (e: KeyboardEvent<SVGElement>) => {
      if (!isEditable || !setRating) {
        return;
      }
      if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
        e.preventDefault();
        if (!rating) {
          setRating(1);
        } else {
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      } else if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
        e.preventDefault();
        setRating(rating > 1 ? rating - 1 : 1);
        ratingArrayRef.current[rating - 2]?.focus();
      }
    };

    return (
      <div
        {...props}
        ref={ref}
        className={cn(className, {
          [styles.error]: error,
        })}
      >
        <div
          className={styles.rating}
          role={isEditable ? 'radiogroup' : 'img'}
          aria-label={isEditable ? 'Оценка' : 'Рейтинг ' + rating + ' из 5'}
        >
          {ratingArray.map((r, i) => (
            <span key={i}>{r}</span>
          ))}
        </div>
        {error && <div className={styles.errorMsg}>{error.message}</div>}
      </div>
    );
  }
);
