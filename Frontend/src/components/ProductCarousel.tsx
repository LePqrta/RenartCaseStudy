import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Product, ApiFilterParams } from '../types/Product';
import type { FilterOptions } from '../types/Filter';
import { DEFAULT_FILTERS } from '../types/Filter';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import ProductFilter from './ProductFilter';
import ProductService from '../services/productService';
import './ProductCarousel.css';

const ProductCarousel: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [productsPerPage, setProductsPerPage] = useState(4);
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);

  const totalPages = Math.ceil(products.length / productsPerPage);


  useEffect(() => {
    loadProducts();
  }, [filters]);


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 720) {
        setProductsPerPage(1);
      } else if (width < 900) {
        setProductsPerPage(2); // Medium tablets (iPad Mini, iPad Air portrait)
      } else if (width < 1024) {
        setProductsPerPage(2); // Tablets landscape, small laptops
      } else if (width < 1280) {
        setProductsPerPage(3); // Large tablets landscape
      } else {
        setProductsPerPage(4); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentSlide >= totalPages) {
      setCurrentSlide(Math.max(0, totalPages - 1));
    }
  }, [productsPerPage, totalPages, currentSlide]);

  // Sync scroll position when currentSlide changes (from arrows/keyboard)
  useEffect(() => {
    if (carouselRef.current) {
      isProgrammaticScrollRef.current = true;
      const carousel = carouselRef.current;
      const scrollWidth = carousel.scrollWidth;
      const targetScroll = (scrollWidth / totalPages) * currentSlide;
      carousel.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      
      // Reset flag after scroll animation completes
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 500);
    }
  }, [currentSlide, totalPages]);

  // Sync currentSlide when scrollbar is used
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      // Ignore scroll events triggered by programmatic scrolling
      if (isProgrammaticScrollRef.current) return;
      
      const scrollLeft = carousel.scrollLeft;
      const scrollWidth = carousel.scrollWidth;
      const pageWidth = scrollWidth / totalPages;
      const newSlide = Math.round(scrollLeft / pageWidth);
      
      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < totalPages) {
        setCurrentSlide(newSlide);
      }
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [currentSlide, totalPages]);

  const convertFiltersToApiParams = (filterOptions: FilterOptions): ApiFilterParams => {
    const apiParams: ApiFilterParams = {};
    
    if (filterOptions.minPrice > DEFAULT_FILTERS.minPrice) {
      apiParams.minPrice = filterOptions.minPrice;
    }
    if (filterOptions.maxPrice < DEFAULT_FILTERS.maxPrice) {
      apiParams.maxPrice = filterOptions.maxPrice;
    }
    if (filterOptions.minPopularity > DEFAULT_FILTERS.minPopularity) {
      apiParams.minPopularity = filterOptions.minPopularity;
    }
    if (filterOptions.maxPopularity < DEFAULT_FILTERS.maxPopularity) {
      apiParams.maxPopularity = filterOptions.maxPopularity;
    }
    
    return apiParams;
  };

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const apiParams = convertFiltersToApiParams(filters);
      const fetchedProducts = await ProductService.fetchProducts(apiParams);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToSlide = useCallback((slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < totalPages) {
      setCurrentSlide(slideIndex);
    }
  }, [totalPages]);

  const nextSlide = () => {
    if (currentSlide < totalPages - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleProductClick = (product: Product) => {
    console.log('Product clicked:', product);
    alert(`You clicked on: ${product.name}`);
  };

  const handleFiltersChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentSlide(0); 
  }, []);

  const handleToggleFilter = useCallback(() => {
    setIsFilterVisible(prev => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        previousSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, totalPages]);

  if (isLoading) {
    return <LoadingSpinner isVisible={true} />;
  }

  return (
    <>
      <ProductFilter 
        onFiltersChange={handleFiltersChange}
        isVisible={isFilterVisible}
        onToggleVisibility={handleToggleFilter}
      />
      
      {products.length === 0 && !isLoading && (
        <div className="no-products">
          <p>No products match your current filters.</p>
          <button 
            className="reset-filters-btn"
            onClick={() => handleFiltersChange(DEFAULT_FILTERS)}
          >
            Reset Filters
          </button>
        </div>
      )}
      
      <div className="product-carousel-container">
        <button 
          className="carousel-btn carousel-btn-prev"
          onClick={previousSlide}
          disabled={currentSlide === 0}
          aria-label="Previous products"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M15 18L9 12L15 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div 
          className="product-carousel"
          ref={carouselRef}
        >
          <div 
            className="product-grid"
          >
            {Array.from({ length: totalPages }, (_, pageIndex) => (
              <div 
                key={pageIndex} 
                className="product-page"
              >
                {products
                  .slice(pageIndex * productsPerPage, (pageIndex + 1) * productsPerPage)
                  .map((product, index) => (
                    <ProductCard
                      key={`${product.name}-${index}`}
                      product={product}
                      onProductClick={handleProductClick}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>

        <button 
          className="carousel-btn carousel-btn-next"
          onClick={nextSlide}
          disabled={currentSlide >= totalPages - 1}
          aria-label="Next products"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M9 18L15 12L9 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Indicators */}
        {totalPages > 1 && (
          <div className="carousel-indicators">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCarousel;
