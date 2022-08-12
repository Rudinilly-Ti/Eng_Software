import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Teste from '../pages/Teste';

const MyRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Teste />} />
  </Routes>
);

export default MyRoutes;
