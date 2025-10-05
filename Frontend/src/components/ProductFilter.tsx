import React, { useState, useCallback } from 'react';
import type { FilterOptions } from '../types/Filter';
import { DEFAULT_FILTERS } from '../types/Filter';
import './ProductFilter.css';

interface ProductFilterProps {
  onFiltersChange: (filters: FilterOptions) => void;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  onFiltersChange, 
  isVisible, 
  onToggleVisibility 
}) => {
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [tempFilters, setTempFilters] = useState<FilterOptions>(DEFAULT_FILTERS);

  const handleFilterChange = useCallback((
    field: keyof FilterOptions, 
    value: number
  ) => {
    setTempFilters(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const applyFilters = () => {
    setFilters(tempFilters);
    onFiltersChange(tempFilters);
    onToggleVisibility();
  };

  const resetFilters = () => {
    setTempFilters(DEFAULT_FILTERS);
    setFilters(DEFAULT_FILTERS);
    onFiltersChange(DEFAULT_FILTERS);
  };

  const hasActiveFilters = () => {
    return (
      filters.minPrice > DEFAULT_FILTERS.minPrice ||
      filters.maxPrice < DEFAULT_FILTERS.maxPrice ||
      filters.minPopularity > DEFAULT_FILTERS.minPopularity ||
      filters.maxPopularity < DEFAULT_FILTERS.maxPopularity
    );
  };

  return (
    <div className="filter-container">
      <button 
        className={`filter-toggle ${hasActiveFilters() ? 'has-filters' : ''}`}
        onClick={onToggleVisibility}
        aria-label="Toggle filters"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path 
            d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        Filters
        {hasActiveFilters() && <span className="filter-badge"></span>}
      </button>

      <div className={`filter-panel ${isVisible ? 'visible' : ''}`}>
        <div className="filter-header">
          <h3>Filter Products</h3>
          <button 
            className="close-btn"
            onClick={onToggleVisibility}
            aria-label="Close filters"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path 
                d="M18 6L6 18M6 6L18 18" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="filter-content">
          {/* Price Range */}
          <div className="filter-group">
            <label className="filter-label">Price Range</label>
            <div className="range-group">
              <div className="input-group">
                <label htmlFor="minPrice">Min Price</label>
                <div className="input-wrapper">
                  <span className="currency">$</span>
                  <input
                    id="minPrice"
                    type="number"
                    min="0"
                    max={tempFilters.maxPrice}
                    value={tempFilters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                    className="filter-input"
                  />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="maxPrice">Max Price</label>
                <div className="input-wrapper">
                  <span className="currency">$</span>
                  <input
                    id="maxPrice"
                    type="number"
                    min={tempFilters.minPrice}
                    max="2000"
                    value={tempFilters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                    className="filter-input"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Popularity Range */}
          <div className="filter-group">
            <label className="filter-label">Popularity (Rating)</label>
            <div className="range-group">
              <div className="input-group">
                <label htmlFor="minPopularity">Min Rating</label>
                <div className="input-wrapper">
                  <input
                    id="minPopularity"
                    type="number"
                    min="0"
                    max={tempFilters.maxPopularity}
                    step="0.1"
                    value={tempFilters.minPopularity}
                    onChange={(e) => handleFilterChange('minPopularity', Number(e.target.value))}
                    className="filter-input"
                  />
                  <span className="rating-suffix">★</span>
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="maxPopularity">Max Rating</label>
                <div className="input-wrapper">
                  <input
                    id="maxPopularity"
                    type="number"
                    min={tempFilters.minPopularity}
                    max="5"
                    step="0.1"
                    value={tempFilters.maxPopularity}
                    onChange={(e) => handleFilterChange('maxPopularity', Number(e.target.value))}
                    className="filter-input"
                  />
                  <span className="rating-suffix">★</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="filter-actions">
            <button 
              className="filter-btn reset-btn"
              onClick={resetFilters}
            >
              Reset
            </button>
            <button 
              className="filter-btn apply-btn"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters() && (
            <div className="active-filters">
              <h4>Active Filters:</h4>
              <div className="filter-tags">
                {filters.minPrice > DEFAULT_FILTERS.minPrice && (
                  <span className="filter-tag">
                    Min Price: ${filters.minPrice}
                  </span>
                )}
                {filters.maxPrice < DEFAULT_FILTERS.maxPrice && (
                  <span className="filter-tag">
                    Max Price: ${filters.maxPrice}
                  </span>
                )}
                {filters.minPopularity > DEFAULT_FILTERS.minPopularity && (
                  <span className="filter-tag">
                    Min Rating: {filters.minPopularity}★
                  </span>
                )}
                {filters.maxPopularity < DEFAULT_FILTERS.maxPopularity && (
                  <span className="filter-tag">
                    Max Rating: {filters.maxPopularity}★
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isVisible && (
        <div 
          className={`filter-overlay ${isVisible ? 'visible' : ''}`} 
          onClick={onToggleVisibility}
        ></div>
      )}
    </div>
  );
};

export default ProductFilter;
