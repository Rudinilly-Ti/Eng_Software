import React from 'react';
import { Product } from '../../types/product';
import './styles.scss';

type Props = {
  product: Product;
  className?: string;
};

const ProductCard = ({ product, className }: Props) => {
  return (
    <div className={`product-card ${className}`}>
      <img
        className="product-image"
        src={product.imageUrl}
        alt={product.name}
      />
      <div className="product-details">
        <div className="product-details-bg" />
        <div className="product-details-info">
          <h5 className="name">{product.name}</h5>
          <p className="description">{product.description}</p>
          <h5 className="price">
            R$ {product.price ? product.price / 100 : 0}
          </h5>
        </div>
      </div>
    </div>
  );
};

ProductCard.defaultProps = {
  className: '',
};

export default ProductCard;
