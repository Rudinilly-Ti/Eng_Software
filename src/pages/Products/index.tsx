import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import React, { useState, useEffect } from 'react';
import Cart from '../../components/Cart';
import GenericModal from '../../components/GenericModal';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types/product';
import './styles.scss';
import api from '../../services/api';
import Alert from '../../components/Alert';

type Props = {
  product: Product;
  quantidade: number;
  size: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Props[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [itemToAdd, setItemToAdd] = useState<Props | null>(null);
  const [alertJSON, setAlertJSON] = useState({
    primaryColor: '',
    secondaryColor: '',
    msg: '',
    className: '',
  });

  const handleOpenModal = (product: Product) => {
    setItemToAdd({ product, quantidade: 1, size: '' });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    const size = document.getElementsByName(
      'size',
    ) as NodeListOf<HTMLInputElement>;


    for (let index = 0; index < size.length; index++) {
      size[index].checked = false;

    }

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

    if (!product.product.price) {
      const expression = product.product.sizes?.find(tamanho => tamanho.productSize?.value === product.size);
      const sizeExists = expression?.productSize?.id
      const price = expression?.price;

      if (price && sizeExists) {
        product.product.price = price;
        product.product.size = sizeExists;
        setItemToAdd({ ...itemToAdd as Props, product: { ...product.product, size: sizeExists, price } })
      }
    } else {
      checked = true;
    }

    const productExists = cart.some(
      (item) =>
        item.product.id === product.product.id && item.size === product.size,
    );

    if (!checked) {
      setTimeout(() => {
        setAlertJSON({
          primaryColor: '',
          secondaryColor: '',
          msg: '',
          className: '',
        });
      }, 5000);
      setAlertJSON({
        primaryColor: '#BF2604',
        secondaryColor: '#730202',
        msg: 'Selecione um tamanho',
        className: 'notice-card',
      });
      return;
    }

    if (!productExists) {
      setCart([...cart, product]);
      handleCloseModal();
      setTimeout(() => {
        setAlertJSON({
          primaryColor: '',
          secondaryColor: '',
          msg: '',
          className: '',
        });
      }, 5000);
      setAlertJSON({
        primaryColor: '#68a373',
        secondaryColor: '#39593f',
        msg: 'Produto adicionado com sucesso',
        className: 'notice-card',
      });
    } else {
      setTimeout(() => {
        setAlertJSON({
          primaryColor: '',
          secondaryColor: '',
          msg: '',
          className: '',
        });
      }, 5000);
      setAlertJSON({
        primaryColor: '#BF2604',
        secondaryColor: '#730202',
        msg: 'Produto já adicionado no carrinho',
        className: 'notice-card',
      });
      handleCloseModal();
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

  const handleGetProducts = async () => {
    await api
      .get('/products/')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleDisableInput = (type: string): boolean => {
    const disable = itemToAdd?.product.sizes?.some(size =>
      size.productSize?.value === type
    )

    return !disable;
  }


  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <>
      <Alert
        notice={alertJSON.msg}
        cardColor={alertJSON.primaryColor}
        timeBarColor={alertJSON.secondaryColor}
        className={alertJSON.className}
      />
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
            {products.map((product: Product) => (
              <>
                {product.isAvailable &&
                  product.productType?.name === 'Pizzas' ? (
                  <ProductCard
                    product={product}
                    addProduct={() => handleOpenModal(product)}
                    key={product.id}
                  />
                ) : null}
              </>
            ))}
          </div>
        </div>
        <div id="lanches" className="products-content">
          <h1>Lanches</h1>
          <hr />
          <div className="items" />
        </div>
        <div id="bebidas" className="products-content">
          <h1>Bebidas</h1>
          <hr />
          <div className="items" />
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
              <input type="radio" disabled={handleDisableInput('P')} name="size" id="P" value="P" />P
            </label>
            <label htmlFor="M">
              <input type="radio" disabled={handleDisableInput('M')} name="size" id="M" value="M" />M
            </label>
            <label htmlFor="G">
              <input type="radio" disabled={handleDisableInput('G')} name="size" id="G" value="G" />G
            </label>
            <label htmlFor="GG">
              <input type="radio" disabled={handleDisableInput('GG')} name="size" id="GG" value="GG" />
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
