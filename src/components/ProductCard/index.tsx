import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import React from 'react';
import { Product } from '../../types/product';
import './styles.scss';

type Props = {
  product: Product;
  addProduct: () => void;
};

const ProductCard = ({ product, addProduct }: Props) => {
  return (
    <div className="product-card">
      <img className="product-image" src={product.img_url} alt={product.name} />
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

export default ProductCard;
