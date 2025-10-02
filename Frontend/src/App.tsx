import { useState, useEffect } from 'react';
import ProductCarousel from './components/ProductCarousel';
import Filters from './components/Filters';
import { productService } from './services/productService';
import type { Product, FilterParams } from './types/Product';
import './App.css';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (filters?: FilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProducts(filters);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleApplyFilters = (filters: FilterParams) => {
    fetchProducts(filters);
  };

  const handleClearFilters = () => {
    fetchProducts();
  };

  return (
    <div className="container">
      <div className="product-list-header">
        <h1 className="product-list-title">Product List</h1>
        <div className="header-controls">
          <span className="product-count">
            {loading ? 'Loading...' : `${products.length} items`}
          </span>
        </div>
      </div>

      <Filters
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
        isLoading={loading}
      />

      {loading && (
        <div className="loading">Loading products...</div>
      )}

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {!loading && !error && (
        <ProductCarousel products={products} />
      )}
    </div>
  );
}

export default App;
