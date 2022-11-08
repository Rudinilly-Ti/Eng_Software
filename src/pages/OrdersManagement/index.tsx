import React, { useEffect, useState } from 'react';
import Alert from '../../components/Alert';
import GenericModal from '../../components/GenericModal';
import OpenStore from '../../components/OpenStore';
import OrderStatus from '../../components/OrderStatus';
import api from '../../services/api';
import './styles.scss';
import Tabs from './Tabs';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderToShow, setOrderToShow] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [alertJSON, setAlertJSON] = useState({
    primaryColor: '',
    secondaryColor: '',
    msg: '',
    className: '',
  });

  async function fetchOrders(tab: number) {
    let status: string;

    switch (tab) {
      case 1:
        status = '';
        break;
      case 2:
        status = 'PREPARING';
        break;
      case 3:
        status = 'DELIVERY';
        break;
      case 4:
        status = 'DONE';
        break;
      case 5:
        status = 'CANCELED';
        break;
      default:
        status = '';
        break;
    }

    const url = `/orders?status=${status}`;

    await api
      .get(url)
      .then((response) => {
        if (tab === 1) {
          const formatedOrders = response.data.filter(
            (order: any) => order.status === null,
          );
          setOrders(formatedOrders);
        } else {
          setOrders(response.data);
        }
      })
      .catch(() => {
        setTimeout(() => {
          setAlertJSON({
            primaryColor: '',
            secondaryColor: '',
            msg: '',
            className: '',
          });
        }, 5000);
        return setAlertJSON({
          primaryColor: '#BF2604',
          secondaryColor: '#730202',
          msg: 'Erro ao carregar pedidos',
          className: 'notice-card',
        });
      });
  }

  useEffect(() => {
    fetchOrders(activeTab);
  }, [activeTab]);

  async function handleTabClick(tab: number) {
    setActiveTab(tab);
  }

  function changeAlertMessage(message: any) {
    setAlertJSON(message);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <Alert
        notice={alertJSON.msg}
        cardColor={alertJSON.primaryColor}
        timeBarColor={alertJSON.secondaryColor}
        className={alertJSON.className}
      />
      <GenericModal
        title="Detalhes do Pedido"
        show={showModal}
        onClose={closeModal}
      >
        {orderToShow ? (
          <div className="order-details">
            <h4 className="order-id">{orderToShow.id}</h4>
            <div className="customer-info">
              <p>
                <b>Nome do Cliente:</b> {orderToShow.clientName}
              </p>
              <p>
                <b>Celular do Cliente:</b> {orderToShow.clientPhoneNumber}
              </p>
              <p>
                <b>Endereço:</b> {orderToShow.streetName},{' '}
                {orderToShow.houseNumber}, {orderToShow.neighborhood}
              </p>
              <p>
                <b>CEP:</b> {orderToShow.zipcode}
              </p>
              <p>
                <b>CPF:</b> {orderToShow.cpf}
              </p>
            </div>
            <div className="order-info">
              <p>
                <b>Total:</b> R${' '}
                {orderToShow.value ? orderToShow.value / 100 : 0}
              </p>
              <p>
                <b>Troco:</b> R${' '}
                {orderToShow.change ? orderToShow.change / 100 : 0}
              </p>
              <p>
                <b>Forma de Pagamento:</b> {orderToShow.paymentMethod?.type}
              </p>
              <div className="order-products">
                {orderToShow.productsOrders?.map((p: any) => {
                  return (
                    <div className="order-product">
                      <p>
                        <b>{p.product.name}</b>
                      </p>
                      <p>Quantidade: {p.quantity}</p>
                      <p>
                        Preço p/ Un: R${' '}
                        {p.product.price ? p.product.price / 100 : 0}
                      </p>
                      <p>
                        {p.productSize.unit}: {p.productSize.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p>Sem Pedido</p>
        )}
      </GenericModal>
      <div className="container-orders">
        <div className="page-title">
          <h1>Pedidos</h1>
          <OpenStore changeAlertMessage={changeAlertMessage} />
        </div>
        <Tabs changeTab={handleTabClick} />
        {orders.length > 0 ? (
          orders.map((order: any) => (
            <OrderStatus
              changeAlertMessage={changeAlertMessage}
              fetchOrders={fetchOrders}
              toOnClick={() => {
                setOrderToShow(order);
                setShowModal(true);
              }}
              tab={activeTab}
              key={order.id}
              pedido={order}
            />
          ))
        ) : (
          <div className="no-orders">
            <h3>Não há pedidos</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
