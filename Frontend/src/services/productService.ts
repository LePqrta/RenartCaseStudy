import type { Product, ApiFilterParams } from '../types/Product';


export class productService {
  private static baseUrl = 'http://localhost:8080';

  private static buildQueryParams(filters?: ApiFilterParams): string {
    if (!filters) return '';
    
    const params = new URLSearchParams();
    
    if (filters.minPrice !== undefined) {
      params.append('minPrice', filters.minPrice.toString());
    }
    if (filters.maxPrice !== undefined) {
      params.append('maxPrice', filters.maxPrice.toString());
    }
    if (filters.minPopularity !== undefined) {
      params.append('minPopularity', filters.minPopularity.toString());
    }
    if (filters.maxPopularity !== undefined) {
      params.append('maxPopularity', filters.maxPopularity.toString());
    }
    
    return params.toString() ? `?${params.toString()}` : '';
  }

  static async fetchProducts(filters?: ApiFilterParams): Promise<Product[]> {
    try {
      const queryParams = this.buildQueryParams(filters);
      const response = await fetch(`${this.baseUrl}/products${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const products: Product[] = await response.json();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async addProduct(product: Omit<Product, 'name'>): Promise<Product> {
    try {
      const response = await fetch(`${this.baseUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }

  static async removeProduct(productName: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${encodeURIComponent(productName)}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error removing product:', error);
      throw error;
    }
  }

  static async updateProduct(productName: string, updates: Partial<Product>): Promise<Product> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${encodeURIComponent(productName)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
}

// Export both named and default export for compatibility
export default productService;
