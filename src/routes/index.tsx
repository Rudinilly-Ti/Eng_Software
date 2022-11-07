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

const MyRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout user={isAuthenticated()} />}>
      <Route
        path="/"
        element={isAuthenticated() ? <ProductManagement /> : <Products />}
      />
      <Route path="tracking" element={<Tracking />} />
    </Route>

    <Route path="/" element={<Layout user={isAuthenticated()} />}>
      <Route
        path="/"
        element={isAuthenticated() ? <ProductManagement /> : <Products />}
      />
      <Route path="orders" element={isAuthenticated() ? <Orders /> : <Login />} />
      <Route path="categories" element={isAuthenticated() ? <Category /> : null} />
      <Route path="tracking" element={<Tracking />} />
    </Route>

    <Route path="/login" element={<Login />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default MyRoutes;
