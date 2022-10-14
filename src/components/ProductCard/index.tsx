import React from 'react';
import { Product } from '../../types/product';
import './styles.scss';

type Props = {
  product: Product;
  className?: string;
  click?(): void;
};

const ProductCard = ({ product, className, click }: Props) => {
  return (
    <div
      className={`product-card ${className}`}
      onClick={click}
      onKeyDown={click}
      tabIndex={0}
      role="link"
    >
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
            {product.price ? `R$ ${product.price / 100}` : ''}
          </h5>
        </div>
      </div>
    </div>
  );
};

ProductCard.defaultProps = {
  className: '',
  click: null,
};

export default ProductCard;
