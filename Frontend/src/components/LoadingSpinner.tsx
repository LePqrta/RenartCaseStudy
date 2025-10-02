import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  isVisible: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading products...</p>
    </div>
  );
};

export default LoadingSpinner;
