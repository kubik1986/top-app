import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Rating } from '../Rating/Rating';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './cross-small.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSentResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
import { useEffect, useState } from 'react';

export const ReviewForm = ({
  productId,
  isOpened,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    clearErrors,
  } = useForm<IReviewForm>();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
      } else {
        setError('Что-то пошло не так');
      }
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name', {
            required: { value: true, message: 'Заполните имя' },
          })}
          type="text"
          placeholder="Имя"
          error={errors.name}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          {...register('title', {
            required: { value: true, message: 'Заполните заголовок' },
          })}
          type="text"
          placeholder="Заголовок отзыва"
          error={errors.title}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.ratingBlock}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: { value: true, message: 'Укажите рейтинг' },
            }}
            render={({ field }) => (
              <Rating
                className={styles.rating}
                isEditable
                rating={field.value}
                setRating={field.onChange}
                ref={field.ref}
                error={errors.rating}
                tabIndex={isOpened ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {
            required: { value: true, message: 'Заполните текст отзыва' },
            minLength: {
              value: 100,
              message: 'Минимальное количество символов в отзыве - 100',
            },
            maxLength: {
              value: 3000,
              message: 'Максимальное количество символов в отзыве - 3000',
            },
          })}
          className={styles.description}
          placeholder="Текст отзыва"
          error={errors.description}
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button
            className={styles.submitBtn}
            appearance="primary"
            type="submit"
            tabIndex={isOpened ? 0 : -1}
            onClick={() => {
              clearErrors();
              setIsSuccess(false);
              setError(undefined);
            }}
          >
            Отправить
          </Button>
          <span>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={styles.success} role="alert">
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <button
            className={styles.close}
            type="button"
            onClick={() => setIsSuccess(false)}
            aria-label="Закрыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {error && (
        <div className={styles.error}>
          <div className={styles.errorTitle}>Произошла ошибка</div>
          <div>Что-то пошло не так. Попробуйте обновить страницу</div>
          <button
            className={styles.close}
            type="button"
            onClick={() => setError(undefined)}
            aria-label="Закрыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
