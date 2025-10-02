export interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  minPopularity: number;
  maxPopularity: number;
}

export const DEFAULT_FILTERS: FilterOptions = {
  minPrice: 0,
  maxPrice: 1000,
  minPopularity: 0,
  maxPopularity: 5
};
