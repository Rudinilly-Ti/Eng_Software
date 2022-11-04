import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Tracking from '../pages/Tracking';
import Products from '../pages/Products';
import ProductManagement from '../pages/ProductManagement';
import Login from '../pages/Login';

const user = true;

const MyRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout user={false} />}>
      <Route path="products" element={<Products />} />
      <Route path="tracking" element={<Tracking />} />
    </Route>

    <Route path="/" element={<Layout user />}>
      <Route
        path="products"
        element={user ? <ProductManagement /> : <Products />}
      />
    </Route>
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default MyRoutes;
