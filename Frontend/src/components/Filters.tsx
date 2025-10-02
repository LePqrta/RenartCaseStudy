import React, { useState } from 'react';
import type { FilterParams } from '../types/Product';

interface FiltersProps {
  onApplyFilters: (filters: FilterParams) => void;
  onClearFilters: () => void;
  isLoading: boolean;
}

const Filters: React.FC<FiltersProps> = ({ onApplyFilters, onClearFilters, isLoading }) => {
  const [filters, setFilters] = useState<FilterParams>({});

  const handleInputChange = (field: keyof FilterParams, value: string) => {
    const numValue = value === '' ? undefined : parseFloat(value);
    setFilters(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleClear = () => {
    setFilters({});
    onClearFilters();
  };

  return (
    <div className="filters">
      <h3 className="filters-title">Filters</h3>
      <div className="filter-group">
        <div className="filter-item">
          <label htmlFor="minPrice">Min Price ($)</label>
          <input
            id="minPrice"
            type="number"
            min="0"
            step="0.01"
            value={filters.minPrice ?? ''}
            onChange={(e) => handleInputChange('minPrice', e.target.value)}
            placeholder="0.00"
          />
        </div>
        
        <div className="filter-item">
          <label htmlFor="maxPrice">Max Price ($)</label>
          <input
            id="maxPrice"
            type="number"
            min="0"
            step="0.01"
            value={filters.maxPrice ?? ''}
            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
            placeholder="1000.00"
          />
        </div>
        
        <div className="filter-item">
          <label htmlFor="minPopularity">Min Popularity</label>
          <input
            id="minPopularity"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={filters.minPopularity ?? ''}
            onChange={(e) => handleInputChange('minPopularity', e.target.value)}
            placeholder="0.0"
          />
        </div>
        
        <div className="filter-item">
          <label htmlFor="maxPopularity">Max Popularity</label>
          <input
            id="maxPopularity"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={filters.maxPopularity ?? ''}
            onChange={(e) => handleInputChange('maxPopularity', e.target.value)}
            placeholder="5.0"
          />
        </div>
        
        <button
          type="button"
          className="apply-filters-btn"
          onClick={handleApply}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Apply Filters'}
        </button>
        
        <button
          type="button"
          className="clear-filters-btn"
          onClick={handleClear}
          disabled={isLoading}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Filters;