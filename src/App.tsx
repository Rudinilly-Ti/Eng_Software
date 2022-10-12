import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './routes';
import './styles.scss';

const App: React.FC = () => (
  <BrowserRouter>
    <MyRoutes />
  </BrowserRouter>
);

export default App;
