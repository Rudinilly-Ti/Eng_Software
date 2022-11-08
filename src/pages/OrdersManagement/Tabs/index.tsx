/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import './styles.scss';

type Props = {
  changeTab(tab: number): void;
};

const Tabs = ({ changeTab }: Props) => {
  const [active, setActive] = useState(1);
  async function handleTabChange(orderStatus: number) {
    switch (orderStatus) {
      case 1:
        setActive(1);
        changeTab(1);
        break;
      case 2:
        setActive(2);
        changeTab(2);
        break;
      case 3:
        setActive(3);
        changeTab(3);
        break;
      case 4:
        setActive(4);
        changeTab(4);
        break;
      case 5:
        setActive(5);
        changeTab(5);
        break;
      default:
        setActive(6);
        changeTab(6);
        break;
    }
  }

  return (
    <div className="container-tabs">
      <div className="tabs">
        <h4
          className={active === 1 ? 'selected' : ''}
          onClick={() => {
            handleTabChange(1);
          }}
        >
          Pendentes
        </h4>
        <h4
          className={active === 2 ? 'selected' : ''}
          onClick={() => {
            handleTabChange(2);
          }}
        >
          Em Preparo
        </h4>
        <h4
          className={active === 3 ? 'selected' : ''}
          onClick={() => {
            handleTabChange(3);
          }}
        >
          Em Entrega
        </h4>
        <h4
          className={active === 4 ? 'selected' : ''}
          onClick={() => {
            handleTabChange(4);
          }}
        >
          Finalizados
        </h4>
        <h4
          className={active === 5 ? 'selected' : ''}
          onClick={() => {
            handleTabChange(5);
          }}
        >
          Cancelados
        </h4>
        <h4
          className={active === 6 ? 'selected' : ''}
          onClick={() => {
            handleTabChange(6);
          }}
        >
          Todos os Pedidos
        </h4>
      </div>
    </div>
  );
};

export default Tabs;
