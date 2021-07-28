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
import { useState } from 'react';

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IReviewForm>();

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    setIsSuccess(false);
    setError(undefined);
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      );
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то пошло не так');
      }
    } catch (e) {
      setError(e.message);
    }
  };

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
        />
        <Input
          {...register('title', {
            required: { value: true, message: 'Заполните заголовок' },
          })}
          type="text"
          placeholder="Заголовок отзыва"
          error={errors.title}
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
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {
            required: { value: true, message: 'Заполните текст отзыва' },
            minLength: {
              value: 100,
              message: 'Минимальное количество символов - 100',
            },
            maxLength: {
              value: 3000,
              message: 'Максимальное количество символов - 3000',
            },
          })}
          className={styles.description}
          placeholder="Текст отзыва"
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button className={styles.submitBtn} appearance="primary">
            Отправить
          </Button>
          <span>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={styles.success}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <button
            className={styles.close}
            type="button"
            onClick={() => setIsSuccess(false)}
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
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
