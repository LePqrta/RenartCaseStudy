export interface Product {
  name: string;
  popularityScore: number;
  weight: number;
  price: number;
  images: {
    yellow: string;
    rose: string;
    white: string;
  };
  popularityScoreOutOfFive: number;
}

export type ColorType = 'yellow' | 'rose' | 'white';

export interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  minPopularity?: number;
  maxPopularity?: number;
}