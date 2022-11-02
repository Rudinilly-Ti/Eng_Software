import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import React, { useState, useEffect } from 'react';
import Cart from '../../components/Cart';
import GenericModal from '../../components/GenericModal';
import ProductCard from '../../components/ProductCard';
import { Category, Product } from '../../types/product';
import './styles.scss';

type Props = {
  product: Product;
  quantidade: number;
  size: string;
};

const Category1: Category = {
  id: 1,
  name: 'category1',
};

const Product1: Product = {
  available: true,
  category: Category1,
  description: 'some Description',
  id: 1,
  img_url:
    'https://s3-sa-east-1.amazonaws.com/deliveryon-uploads/products/manjerona/56_5c59df21e94c7.jpg',
  name: 'Product 1',
  price: 12.5,
};

const Products = () => {
  const [cart, setCart] = useState<Props[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [itemToAdd, setItemToAdd] = useState<Props | null>(null);

  const handleOpenModal = (product: Product) => {
    setItemToAdd({ product, quantidade: 1, size: '' });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setItemToAdd(null);
  };

  const handleIncrementProductToAdd = () => {
    if (itemToAdd) {
      setItemToAdd({ ...itemToAdd, quantidade: itemToAdd.quantidade + 1 });
    }
  };

  const handleDecrementProductToAdd = () => {
    if (itemToAdd) {
      setItemToAdd({ ...itemToAdd, quantidade: itemToAdd.quantidade - 1 });
    }
  };

  const handleAddProduct = (product: Props) => {
    let checked = false;
    const size = document.getElementsByName(
      'size',
    ) as NodeListOf<HTMLInputElement>;

    size.forEach((item) => {
      if (item.checked) {
        product.size = item.value;
        checked = true;
      }
    });

    const productExists = cart.some(
      (item) =>
        item.product.id === product.product.id && item.size === product.size,
    );

    if (!checked) {
      // eslint-disable-next-line no-alert
      alert('Selecione um tamanho');
      return;
    }

    if (!productExists) {
      setCart([...cart, product]);
      handleCloseModal();
    } else {
      // eslint-disable-next-line no-alert
      alert('Produto já adicionado ao carrinho');
    }
  };

  const handleRemoveProduct = (product: Props) => {
    const newCart = cart.filter(
      (item) =>
        item.product.id !== product.product.id || item.size !== product.size,
    );
    setCart(newCart);
  };

  const handleIncrement = (item: Props) => {
    const newCartItems = cart.map((cartItem) => {
      if (
        cartItem.product.id === item.product.id &&
        cartItem.size === item.size
      ) {
        return {
          ...cartItem,
          quantidade: cartItem.quantidade + 1,
        };
      }
      return cartItem;
    });
    setCart(newCartItems);
  };

  const handleDecrement = (item: Props) => {
    let removeItem = false;
    const newCartItems = cart.map((cartItem) => {
      if (
        cartItem.product.id === item.product.id &&
        cartItem.size === item.size
      ) {
        if (cartItem.quantidade > 1) {
          return {
            ...cartItem,
            quantidade: cartItem.quantidade - 1,
          };
        }
        removeItem = true;
      }
      return cartItem;
    });
    if (removeItem) {
      handleRemoveProduct(item);
    } else {
      setCart(newCartItems);
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <>
      <div className="products-container">
        <div className="products-links">
          <a href="#pizzas">Pizzas</a>
          <a href="#lanches">Lanches</a>
          <a href="#bebidas">Bebidas</a>
        </div>

        <div id="pizzas" className="products-content">
          <h1>Pizzas</h1>
          <hr />
          <div className="items">
            <ProductCard
              product={Product1}
              addProduct={() => handleOpenModal(Product1)}
              key={1}
            />
            <ProductCard
              product={Product1}
              addProduct={() => handleOpenModal(Product1)}
              key={1}
            />
            <ProductCard
              product={Product1}
              addProduct={() => handleOpenModal(Product1)}
              key={1}
            />
            <ProductCard
              product={Product1}
              addProduct={() => handleOpenModal(Product1)}
              key={1}
            />
          </div>
        </div>
        <div id="lanches" className="products-content">
          <h1>Lanches</h1>
          <hr />
          <div className="items">
            <ProductCard
              product={Product1}
              addProduct={() => handleOpenModal(Product1)}
              key={1}
            />
            <ProductCard
              product={Product1}
              addProduct={() => handleOpenModal(Product1)}
              key={1}
            />
            <ProductCard
              product={Product1}
              addProduct={() => handleOpenModal(Product1)}
              key={1}
            />
            <ProductCard
              product={Product1}
              addProduct={() => handleOpenModal(Product1)}
              key={1}
            />
          </div>
        </div>
        <div id="bebidas" className="products-content">
          <h1>Bebidas</h1>
          <hr />
          <div className="items">
            <ProductCard
              product={Product1}
              addProduct={() => handleOpenModal(Product1)}
              key={1}
            />
            <ProductCard
              product={Product1}
              addProduct={() => handleOpenModal(Product1)}
              key={1}
            />
            <ProductCard
              product={Product1}
              addProduct={() => handleOpenModal(Product1)}
              key={1}
            />
            <ProductCard
              product={Product1}
              addProduct={() => handleOpenModal(Product1)}
              key={1}
            />
          </div>
        </div>
      </div>
      <Cart
        items={cart}
        clearCart={handleClearCart}
        increment={handleIncrement}
        decrement={handleDecrement}
      />
      <GenericModal
        show={openModal}
        title="Escolha um tamanho"
        onClose={handleCloseModal}
      >
        <div className="add-item-modal-content">
          <div className="add-item-size">
            <label htmlFor="P">
              <input type="radio" name="size" id="P" value="P" />P
            </label>
            <label htmlFor="M">
              <input type="radio" name="size" id="M" value="M" />M
            </label>
            <label htmlFor="G">
              <input type="radio" name="size" id="G" value="G" />G
            </label>
            <label htmlFor="GG">
              <input type="radio" name="size" id="GG" value="GG" />
              GG
            </label>
          </div>

          <div className="add-item-qnt">
            <h4>Quantidade</h4>
            <div>
              <button
                className="add-item-button"
                onClick={handleDecrementProductToAdd}
                type="button"
              >
                <FontAwesomeIcon icon={solid('minus')} />
              </button>
              <span>{itemToAdd?.quantidade}</span>
              <button
                className="add-item-button"
                onClick={handleIncrementProductToAdd}
                type="button"
              >
                <FontAwesomeIcon icon={solid('plus')} />
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleAddProduct(itemToAdd as Props)}
            className="add-item-modal-button"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </GenericModal>
    </>
  );
};

export default Products;
