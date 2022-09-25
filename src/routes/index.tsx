import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Teste from '../pages/Teste';
import Tracking from '../pages/Tracking';

const MyRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout user={false} />}>
      <Route path="products" element={<Teste />} />
      <Route path="tracking" element={<Tracking />} />
    </Route>
  </Routes>
);

export default MyRoutes;
