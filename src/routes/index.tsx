import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Teste from '../pages/Teste';
import Tracking from '../pages/Tracking';
import ProductManagement from '../pages/ProductManagement';
import Login from '../pages/Login';
import Category from '../pages/Category';

const user = true;

const MyRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout user={user} />}>
      <Route
        path="products"
        element={user ? <ProductManagement /> : <Teste />}
      />
      <Route path="categories" element={user ? <Category /> : null} />
      <Route path="tracking" element={<Tracking />} />
    </Route>
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default MyRoutes;
