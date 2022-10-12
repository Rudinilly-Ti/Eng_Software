import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <MyRoutes />
  </BrowserRouter>
);

export default App;
