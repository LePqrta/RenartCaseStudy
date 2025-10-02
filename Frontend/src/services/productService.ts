import axios from 'axios';
import type { Product, FilterParams } from '../types/Product';

const API_BASE_URL = 'http://localhost:8080';

export const productService = {
  async getProducts(filters?: FilterParams): Promise<Product[]> {
    try {
      const params = new URLSearchParams();
      
      if (filters?.minPrice !== undefined) {
        params.append('minPrice', filters.minPrice.toString());
      }
      if (filters?.maxPrice !== undefined) {
        params.append('maxPrice', filters.maxPrice.toString());
      }
      if (filters?.minPopularity !== undefined) {
        params.append('minPopularity', filters.minPopularity.toString());
      }
      if (filters?.maxPopularity !== undefined) {
        params.append('maxPopularity', filters.maxPopularity.toString());
      }

      const response = await axios.get<Product[]>(`${API_BASE_URL}/products`, {
        params: Object.fromEntries(params)
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        throw new Error(error.response.data?.message || 'Invalid filter parameters');
      }
      throw new Error('Failed to fetch products');
    }
  }
};