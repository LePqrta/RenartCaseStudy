// Product interface matching backend response
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

// Color options
export const COLOR_OPTIONS = {
  'yellow': '#E6CA97',
  'white': '#D9D9D9',
  'rose': '#E1A4A9'
} as const;

export type ColorOption = keyof typeof COLOR_OPTIONS;

// API Filter Parameters
export interface ApiFilterParams {
  minPrice?: number;
  maxPrice?: number;
  minPopularity?: number;
  maxPopularity?: number;
}
