/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Tracking from '../pages/Tracking';
import Products from '../pages/Products';
import ProductManagement from '../pages/ProductManagement';
import Login from '../pages/Login';
import Orders from '../pages/OrdersManagement';
import Category from '../pages/Category';
import AuthContext from '../services/auth';


const MyRoutes: React.FC = () => {
  const { signed } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Layout user={signed} />}>
        <Route
          path="/"
          element={signed ? <ProductManagement /> : <Products />}
        />
        <Route path="orders" element={signed ? <Orders /> : <Navigate to="/login" replace />} />
        <Route path="categories" element={signed ? <Category /> : <Navigate to="/login" replace />} />
        <Route path="tracking" element={<Tracking />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default MyRoutes;
