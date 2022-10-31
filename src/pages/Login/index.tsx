import React, { useState } from 'react';
import './styles.scss';

const Login = () => {
  const [user, setUser] = useState({});
  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="project-logo">δ</h1>
        <form action="/">
          <input type="email" className="email-input" placeholder="E-mail" />
          <input type="password" className="passw-input" placeholder="Senha" />
          <button className="login-btn" type="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
