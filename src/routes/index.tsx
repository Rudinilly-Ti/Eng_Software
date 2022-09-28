import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Teste from '../pages/Teste';
import Tracking from '../pages/Tracking';
import ProductManagement from '../pages/ProductManagement';

const MyRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout user={false} />}>
      <Route path="products" element={<Teste />} />
      <Route path="tracking" element={<Tracking />} />
      <Route path="product-management" element={<ProductManagement />} />
    </Route>
  </Routes>
);

export default MyRoutes;
