import React from 'react';
import ProductCard from '../../components/ProductCard';
import { Product, Category } from '../../types/product';

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

const Teste: React.FC = () => {
  return (
    <>
      <ProductCard product={Product1} key={1} />
      <ProductCard product={Product1} key={1} />
      <ProductCard product={Product1} key={1} />
    </>
  );
};

export default Teste;
