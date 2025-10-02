import React, { useState } from 'react';
import type { Product, ColorType } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<ColorType>('yellow');

  const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star"></span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star"></span>);
      } else {
        stars.push(<span key={i} className="star empty"></span>);
      }
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.images[selectedColor]}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-price">${product.price.toFixed(2)} USD</div>
        
        <div className="color-picker">
          <div className="color-options">
            {(Object.keys(product.images) as ColorType[]).map((color) => (
              <button
                key={color}
                className={`color-option ${color} ${selectedColor === color ? 'active' : ''}`}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select ${color} color`}
                type="button"
              />
            ))}
          </div>
          <span className="color-picker-label">
            {selectedColor === 'yellow' ? 'Yellow Gold' : 
             selectedColor === 'rose' ? 'Rose Gold' : 
             selectedColor === 'white' ? 'White Gold' : selectedColor}
          </span>
        </div>
        
        <div className="popularity-score">
          <div className="stars-container">
            <div className="stars">
              {renderStars(product.popularityScoreOutOfFive)}
            </div>
            <span className="score-text">{product.popularityScoreOutOfFive}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
