import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import { TopLevelCategory } from '../interfaces/page.interface';
import { FirstLevelMenuItem } from '../interfaces/menu.interface';
import { ProductItem } from '../interfaces/product.interface';

export const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: 'courses',
    name: 'Курсы',
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: 'services',
    name: 'Сервисы',
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services,
  },
  {
    route: 'books',
    name: 'Книги',
    icon: <BooksIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: 'products',
    name: 'Товары',
    icon: <ProductsIcon />,
    id: TopLevelCategory.Products,
  },
];

export const priceRu = (price: number): string =>
  price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')
    .concat('\u00A0₽');

export const declOfNumber = (
  number: number,
  titles: [string, string, string]
): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

export const ratingComparator = (a: ProductItem, b: ProductItem): number => {
  const aRating = a.reviewAvg ?? a.initialRating;
  const bRating = b.reviewAvg ?? b.initialRating;
  return aRating > bRating
    ? -1
    : aRating < bRating
    ? 1
    : a.reviewCount > b.reviewCount
    ? -1
    : a.reviewCount < b.reviewCount
    ? 1
    : a.price > b.price
    ? 1
    : -1;
};

export const priceComparator = (a: ProductItem, b: ProductItem): number => {
  return a.price > b.price ? 1 : -1;
};
