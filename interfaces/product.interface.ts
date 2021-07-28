export interface ProductCharacteristic {
  value: string;
  name: string;
}

export interface ReviewItem {
  _id: string;
  name: string;
  title: string;
  description: string;
  rating: number;
  createdAt: Date;
}

export interface ProductItem {
  _id: string;
  categories: string[];
  tags: string[];
  title: string;
  description: string;
  link: string;
  image: string;
  characteristics: ProductCharacteristic[];
  initialRating: number;
  credit: number;
  price: number;
  oldPrice: number;
  advantages?: string;
  disAdvantages?: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  html: string;
  reviews: ReviewItem[];
  reviewCount: number;
  reviewAvg?: number;
}
