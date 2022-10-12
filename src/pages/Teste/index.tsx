import React from 'react';
import OrderStatus from '../../components/OrderStatus';
import { Pedido } from '../../types/order';
const order: Pedido = {
  id:1,
  customerName: "nome",
  product: [
    {
      id: 10,
      name: "aamor",
      category: {
        id: 12,
        name: "pizza"
      },
      description: "Uma pizza do amor",
      available: true,
      price: 40,
      img_url: "sla"
    }
  ]
}

const Teste: React.FC = () => {
  return (
    <div className="container">
    </div>
  );
};

export default Teste;
