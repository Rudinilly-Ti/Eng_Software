import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert';
import api from '../../services/api';
import { login } from '../../services/auth';
import './styles.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertJSON, setAlertJSON] = useState({
    primaryColor: '',
    secondaryColor: '',
    msg: '',
    className: '',
  });

  const navigate = useNavigate();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    const data = {
      username,
      password,
    };

    await api
      .post('/authenticate', data)
      .then((response) => {
        login(response.data.access_token);
        navigate('/');
      })
      .catch(() => {
        setTimeout(() => {
          setAlertJSON({
            primaryColor: '',
            secondaryColor: '',
            msg: '',
            className: '',
          });
        }, 5000);
        return setAlertJSON({
          primaryColor: '#BF2604',
          secondaryColor: '#730202',
          msg: 'Erro ao realizar o login',
          className: 'notice-card',
        });
      });
  }
  return (
    <>
      <Alert
        notice={alertJSON.msg}
        cardColor={alertJSON.primaryColor}
        timeBarColor={alertJSON.secondaryColor}
        className={alertJSON.className}
      />
      <div className="login-container">
        <div className="login-form">
          <h1 className="project-logo">δ</h1>
          <form action="/" onSubmit={handleLogin}>
            <input
              type="email"
              className="email-input"
              placeholder="E-mail"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="passw-input"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
