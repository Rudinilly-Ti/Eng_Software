/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './routes';
import { AuthProvider } from './services/auth';
import './styles.scss';

const App: React.FC = () => (
  <AuthProvider>
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
