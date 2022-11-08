import React from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import api from '../../services/api';

type Props = {
  pedido: any;
  tab: number;
  fetchOrders(tab: number): void;
  changeAlertMessage(msg: any): void;
  toOnClick(): void;
};

const OrderStatus = ({
  pedido,
  tab,
  fetchOrders,
  changeAlertMessage,
  toOnClick,
}: Props) => {
  async function handleOrderStatusChange(newOrderStatus: number) {
    let status: string;

    switch (newOrderStatus) {
      case 2:
        status = '38754a92-cc18-4d5a-bfec-edd95d1b9136';
        break;
      case 3:
        status = '540c0bde-03eb-4d6b-908b-e6b1eba227e5';
        break;
      case 4:
        status = '0c2299ef-047e-4392-bc11-4208699923b1';
        break;
      case 5:
        status = '511b1630-1489-46e6-a439-13ce1adf48f0';
        break;
      default:
        status = '';
        break;
    }

    const url = `/orders/${pedido.id}`;

    await api
      .patch(url, { statusId: status })
      .then(() => {
        fetchOrders(tab);
      })
      .catch(() => {
        setTimeout(() => {
          changeAlertMessage({
            primaryColor: '',
            secondaryColor: '',
            msg: '',
            className: '',
          });
        }, 5000);
        return changeAlertMessage({
          primaryColor: '#BF2604',
          secondaryColor: '#730202',
          msg: 'Erro ao mudar status do pedido',
          className: 'notice-card',
        });
      });
  }

  return (
    <div className="Order">
      <div className="OrderInfo">
        <div className="info">
          <h3>#{pedido.id}</h3>
          <p>{pedido.clientName}</p>
          <p className="produto">
            {pedido.productsOrders.map(
              (productOrder: any) =>
                `${productOrder.quantity}x ${productOrder.product.name}; `,
            )}
          </p>
        </div>

        <div className="OrderIcons">
          <FontAwesomeIcon
            className="OrderIcon"
            icon={solid('play')}
            size="3x"
            onClick={() => {
              handleOrderStatusChange(2);
            }}
          />
          <FontAwesomeIcon
            className="OrderIcon"
            icon={solid('truck')}
            size="3x"
            onClick={() => {
              handleOrderStatusChange(3);
            }}
          />
          <FontAwesomeIcon
            className="OrderIcon"
            icon={solid('circle-check')}
            size="3x"
            onClick={() => {
              handleOrderStatusChange(4);
            }}
          />
          <FontAwesomeIcon
            className="OrderIcon"
            icon={solid('ban')}
            size="3x"
            onClick={() => {
              handleOrderStatusChange(5);
            }}
          />

          <div className="relatorio">
            <FontAwesomeIcon
              className="OrderIcon"
              icon={solid('file-lines')}
              size="3x"
              onClick={toOnClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
