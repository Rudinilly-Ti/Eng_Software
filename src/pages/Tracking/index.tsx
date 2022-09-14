import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './styles.scss';

const Tracking = () => {
  const [tracking] = useState(true);
  return (
    <div className="tracking-container">
      <div className="tracking-heading">
        <h2>Buscar Pedido</h2>
        <span>
          <input type="text" />
          <button type="button">
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
                <div className="active" />
              </div>
              <div className="situation">
                <span>Em Preparo</span>
                <div />
              </div>
              <div className="situation">
                <span>Saiu para entrega</span>
                <div />
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
                  <tr>
                    <td>1</td>
                    <td>Pizza</td>
                    <td>39,90</td>
                  </tr>
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
                    <td>39,90</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Tracking;
