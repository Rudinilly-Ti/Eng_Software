import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import React, { useState, useEffect, FormEvent } from 'react';
import GenericModal from '../GenericModal';
import './styles.scss';
import CartItem from './CartItem';
import { Product } from '../../types/product';
import api from '../../services/api';

type Props = {
  product: Product;
  quantidade: number;
  size: string;
};

type CartProps = {
  items: Props[];
  increment: (product: Props) => void;
  decrement: (product: Props) => void;
  clearCart: () => void;
};

type AddressProps = {
  nome: string;
  cpf: string;
  phone: string;
  cep: string;
  bairro: string;
  rua: string;
  numero: string;
  observacao: string;
};

const Cart = ({ items, increment, decrement, clearCart }: CartProps) => {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Props[]>([]);
  const [total, setTotal] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [address, setAddress] = useState<AddressProps>({
    nome: '',
    cpf: '',
    phone: '',
    cep: '',
    bairro: '',
    rua: '',
    numero: '',
    observacao: '',
  });

  useEffect(() => {
    setCartItems(items);
  }, [items]);

  useEffect(() => {
    let price = 0;
    cartItems.forEach((item) => {
      if (item.product.price )
        price += item.product.price * item.quantidade;
    });
    setTotal(price);
  }, [cartItems]);

  const handleOpenCart = () => {
    setOpen(!open);
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddressChange = (e: FormEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setAddress({ ...address, [name]: value });
  };

  const handleFinishOrder = async (e: FormEvent) => {
    e.preventDefault();

    const payment = document.getElementsByName(
      'payment',
    ) as NodeListOf<HTMLInputElement>;

    let paymentMethod = '';

    payment.forEach((item) => {
      if (item.checked) {
        paymentMethod = item.value;
      }
    });

    const itemsToAdd = cartItems.map((item) => {
      return {
        id: item.product.id,
        quantity: item.quantidade,
        productSizeId: item.product.size,
      };
    });

    const addressData = { ...address, total, itemsToAdd, paymentMethod };

    if (
      addressData.nome &&
      addressData.cpf &&
      addressData.phone &&
      addressData.cep &&
      addressData.bairro &&
      addressData.rua &&
      addressData.numero &&
      addressData.observacao &&
      paymentMethod
    ) {
      await api.post('/orders', {
        paymentMethod: addressData.paymentMethod,
        zipcode: addressData.cep,
        cpf: addressData.cpf,
        observation: addressData.observacao,
        neighborhood: addressData.bairro,
        houseNumber: addressData.numero,
        streetName: addressData.rua,
        clientPhoneNumber: addressData.phone,
        clientName: addressData.nome,
        products: addressData.itemsToAdd
      }).then(() => {
        clearCart();
        setOpenModal(false);
      });
    } else {
      // eslint-disable-next-line no-alert
      alert('Preencha todos os campos!');
    }
  };

  return (
    <div
      className={
        open ? 'cart-container' : 'cart-container cart-container-closed'
      }
    >
      <button
        className="open-cart-button"
        onClick={handleOpenCart}
        type="button"
      >
        <span className="cart-icon">
          {open ? (
            <FontAwesomeIcon icon={solid('close')} />
          ) : (
            <FontAwesomeIcon icon={solid('basket-shopping')} />
          )}{' '}
        </span>
      </button>
      <div className="cart-content">
        <h1>Carrinho</h1>
        <hr />
        {cartItems.length > 0 ? (
          <div>
            <table>
              <thead>
                <tr>
                  <td>Qnt</td>
                  <td>Produto</td>
                  <td>Preço</td>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    increment={() => increment(item)}
                    decrement={() => decrement(item)}
                  />
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} style={{ width: '100%' }}>
                    <hr />
                  </td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td />
                  <td>R$ {total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
            <div className="cart-footer">
              <button
                onClick={handleOpenModal}
                className="cart-footer-button"
                type="button"
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        ) : (
          <div className="cart-content-empty">
            <p>Carrinho vazio</p>
          </div>
        )}
      </div>
      <GenericModal
        show={openModal}
        onClose={handleCloseModal}
        title="Dados de entrega"
      >
        <form onSubmit={handleFinishOrder} className="finish-order-modal">
          <input
            type="text"
            onChange={handleAddressChange}
            placeholder="Nome Completo"
            name="nome"
          />
          <input
            type="text"
            onChange={handleAddressChange}
            placeholder="CPF"
            name="cpf"
          />
          <input
            type="text"
            onChange={handleAddressChange}
            placeholder="Telefone"
            name="phone"
          />
          <input
            type="text"
            onChange={handleAddressChange}
            placeholder="CEP"
            name="cep"
          />
          <input
            type="text"
            onChange={handleAddressChange}
            placeholder="Bairro"
            name="bairro"
          />
          <input
            type="text"
            onChange={handleAddressChange}
            placeholder="Rua"
            name="rua"
          />
          <input
            type="text"
            onChange={handleAddressChange}
            placeholder="Número"
            name="numero"
          />
          <input
            type="text"
            onChange={handleAddressChange}
            placeholder="Observaçao"
            name="observacao"
          />

          <div className="finish-order-payment">
            <h4>Forma de Pagamento</h4>
            <div className="finish-order-payment-methods">
              <div className="finish-order-payment-method">
                <input type="radio" name="payment" id="pix" value="pix" />
                <label htmlFor="pix">Pix</label>
              </div>
              <div className="finish-order-payment-method">
                <input
                  type="radio"
                  name="payment"
                  id="credito"
                  value="Credito"
                />
                <label htmlFor="credito">Cartão de crédito</label>
              </div>
              <div className="finish-order-payment-method">
                <input
                  type="radio"
                  name="payment"
                  id="dinheiro"
                  value="Dinheiro"
                />
                <label htmlFor="dinheiro">Dinheiro</label>
              </div>
            </div>
          </div>
          <button type="submit" className="finish-order-modal-button">
            Finalizar
          </button>
        </form>
      </GenericModal>
    </div>
  );
};

export default Cart;
