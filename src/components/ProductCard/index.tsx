import React from 'react';
import { Product } from '../../types/product';
import './styles.scss';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="product-card">
      <img className="product-image" src={product.img_url} alt={product.name} />
      <div className="product-details">
        <div className="product-details-bg" />
        <div className="product-details-info">
          <h5 className="name">{product.name}</h5>
          <p className="description">{product.description}</p>
          <h5 className="price">{product.price}</h5>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
