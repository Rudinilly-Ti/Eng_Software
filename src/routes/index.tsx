import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Tracking from '../pages/Tracking';
import Products from '../pages/Products';
import ProductManagement from '../pages/ProductManagement';
import Login from '../pages/Login';
import Orders from '../pages/OrdersManagement';
import Category from '../pages/Category';
import { isAuthenticated } from '../services/auth';

// const user = isAuthenticated();
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
      <Route path="orders" element={user ? <Orders /> : <Login />} />
      <Route path="categories" element={user ? <Category /> : null} />
      <Route path="tracking" element={<Tracking />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default MyRoutes;
