import React, { useState } from 'react';
import type { Product, ColorOption } from '../types/Product';
import { COLOR_OPTIONS } from '../types/Product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick }) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>('yellow');

  const handleColorSelect = (color: ColorOption, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedColor(color);
  };

  const handleCardClick = () => {
    onProductClick(product);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span 
          key={i} 
          className={`star ${i < fullStars ? '' : 'empty'}`}
        >
          ★
        </span>
      );
    }
    
    return stars;
  };

  const getColorMaterial = (color: ColorOption): string => {
    switch (color) {
      case 'yellow':
        return 'Yellow Gold';
      case 'white':
        return 'White Gold';
      case 'rose':
        return 'Rose Gold';
      default:
        return 'Gold';
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-container">
        <img 
          src={product.images[selectedColor]} 
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">
          ${product.price.toFixed(2)} USD
        </p>
        <div className="product-colors">
          {Object.keys(product.images).map((color) => (
            <div
              key={color}
              className={`color-option color-${color} ${
                selectedColor === color ? 'active' : ''
              }`}
              style={{ backgroundColor: COLOR_OPTIONS[color as ColorOption] }}
              onClick={(e) => handleColorSelect(color as ColorOption, e)}
            />
          ))}
        </div>
        <p className="product-material">{getColorMaterial(selectedColor)}</p>
        <div className="product-rating">
          <div className="stars">
            {renderStars(product.popularityScoreOutOfFive)}
          </div>
          <span className="rating-text">{product.popularityScoreOutOfFive}/5</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
