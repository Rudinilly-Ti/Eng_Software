import React from 'react';
import ProductCard from '../../components/ProductCard';
import './styles.scss';

const pizza = {
  id: 1,
  name: 'Pizza de Frango com Catupiry M',
  category: { id: 1, name: 'Pizza' },
  description: 'Frango, queijo, presunto, catupiry',
  available: true,
  price: 28.99,
  img_url:
    'https://www.receiteria.com.br/wp-content/uploads/pizza-de-frango-de-liquidificador-00.jpg',
};

const Teste: React.FC = () => {
  return <ProductCard product={pizza} />;
};

export default Teste;
