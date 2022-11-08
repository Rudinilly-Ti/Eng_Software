/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './styles.scss';
import api from '../../services/api';

const Tracking = () => {
  const [tracking, setTracking] = useState<any>(null);
  const [search, setSearch] = useState<string>('');

  const updateOrderDetails = (order: any) => {
    api.get(`/orders/${order?.id}`)
      .then((response) => {
        setTracking(response.data);
        console.log(response.data);

      });

    setTimeout(() => {
      updateOrderDetails(order);
    }, 5000);
  };

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem('order') || '{}');
    if (order) {
      updateOrderDetails(order);
    } else {
      setTracking(null);
    }

  }, []);

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  }

  const handleSearch = () => {
    api.get(`/orders/${search}`)
      .then((response) => {
        setTracking(response.data);
      });
  }

  return (
    <div className="tracking-container">
      <div className="tracking-heading">
        <h2>Buscar Pedido</h2>
        <h3>{tracking ? `Pedido: ${tracking.id}` : ''}</h3>
        <span>
          <input type="text" onChange={handleChange} value={search} />
          <button onClick={handleSearch} type="button">
            <FontAwesomeIcon icon={solid('search')} size="lg" color="#fff" />
          </button>
        </span>
      </div>
      {tracking ? (
        <>
          <div className="tracking-situation">
            <h3>Situação do Pedido</h3>
            <hr />
            <div className="tracking-show">
              <div className="situation">
                <span>Pedido Recebido</span>
                <div className={tracking?.status === "PREPARING" || tracking?.status === "DELIVERY" || tracking?.status === "DONE" ? "active" : ''} />
              </div>
              <div className="situation">
                <span>Em Preparo</span>
                <div className={tracking?.status === "PREPARING" || tracking?.status === "DELIVERY" ? "active" : ''} />
              </div>
              <div className="situation">
                <span>Saiu para entrega</span>
                <div className={tracking?.status === "DELIVERY" ? "active" : ''} />
              </div>
            </div>
          </div>
          <div className="tracking-resume">
            <h3>Resumo do Pedido</h3>
            <hr />
            <div>
              <table>
                <thead>
                  <tr>
                    <td>Qnt</td>
                    <td>Produto</td>
                    <td>Preço und</td>
                  </tr>
                </thead>
                <tbody>
                  {tracking?.productsOrders.map((item: any) => (
                    <tr key={item.id}>
                      <td>{item.quantity}</td>
                      <td>{item.product.name}</td>
                      <td>R$ {(item.price / 100).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} style={{ width: 900 }}>
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td />
                    <td>R$ {(tracking.value / 100).toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      ) : null
      }
    </div >
  );
};

export default Tracking;
