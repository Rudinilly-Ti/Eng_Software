import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import React from 'react';
import { Product } from '../../../types/product';

import './styles.scss';

type Props = {
  item: {
    product: Product;
    quantidade: number;
    size: string;
  };
  increment: () => void;
  decrement: () => void;
};

const CartItem = ({ item, increment, decrement }: Props) => {
  return (
    <tr>
      <td>
        <button
          className="item-decrement-button"
          onClick={decrement}
          type="button"
        >
          <FontAwesomeIcon icon={solid('minus')} />
        </button>
        <span>{item.quantidade}</span>
        <button
          className="item-increment-button"
          onClick={increment}
          type="button"
        >
          <FontAwesomeIcon icon={solid('plus')} />
        </button>
      </td>
      <td>{`${item.product.name} (${item.size})`}</td>
      <td> R$ {(item.product.price * item.quantidade).toFixed(2)}</td>
    </tr>
  );
};

export default CartItem;
