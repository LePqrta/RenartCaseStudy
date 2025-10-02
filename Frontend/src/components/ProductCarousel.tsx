import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import ProductCard from './ProductCard';
import type { Product } from '../types/Product';
import './swiper-custom.css';

interface ProductCarouselProps {
  products: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrevClick = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNextClick = () => {
    swiperRef.current?.slideNext();
  };

  if (products.length === 0) {
    return (
      <div className="no-products">
        No products found. Try adjusting your filters.
      </div>
    );
  }

  return (
    <div className="products-carousel">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        slidesPerGroup={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 30,
          },
          1536: {
            slidesPerView: 6,
            slidesPerGroup: 6,
            spaceBetween: 30,
          },
          1920: {
            slidesPerView: 7,
            slidesPerGroup: 7,
            spaceBetween: 30,
          },
        }}
        pagination={false}
        className="swiper"
      >
        {products.map((product, index) => (
          <SwiperSlide key={`${product.name}-${index}`}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      
      {products.length > 1 && (
        <>
          <button
            type="button"
            className="carousel-navigation prev"
            onClick={handlePrevClick}
            aria-label="Previous products"
          >
            &#8249;
          </button>
          <button
            type="button"
            className="carousel-navigation next"
            onClick={handleNextClick}
            aria-label="Next products"
          >
            &#8250;
          </button>
        </>
      )}
    </div>
  );
};

export default ProductCarousel;