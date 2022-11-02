import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../Layout';
import Teste from '../pages/Teste';
import Tracking from '../pages/Tracking';
import Products from '../pages/Products';

const MyRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout user={false} />}>
      <Route path="products" element={<Products />} />
      <Route path="tracking" element={<Tracking />} />
    </Route>
  </Routes>
);

export default MyRoutes;
