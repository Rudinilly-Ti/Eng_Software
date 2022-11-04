import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import React from 'react';
import { Product } from '../../types/product';
import './styles.scss';

type Props = {
  product: Product;
  className?: string;
  addProduct: () => void;
  click?(): void;
};

const ProductCard = ({ product, className, addProduct, click }: Props) => {
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
          <div>
            <h5 className="name">{product.name}</h5>
            <p className="description">{product.description}</p>
            <h5 className="price">{product.price}</h5>
          </div>
          <div className="product-details-button">
            <button onClick={addProduct} type="button">
              <FontAwesomeIcon icon={solid('plus')} />
              Adicionar
            </button>
          </div>
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
