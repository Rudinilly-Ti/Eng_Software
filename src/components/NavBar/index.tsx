import React, { useState, useCallback, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { To, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './styles.scss';
import AuthContext from '../../services/auth';

type Props = {
  user: boolean;
}

const NavBar = ({ user }: Props) => {
  const context = useContext(AuthContext);

  const [active, setActive] = useState(true);
  const [active2, setActive2] = useState(true);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/tracking') {
      setActive(false);
    } else if (location.pathname === '/requests' && user) {
      setActive(true);
      setActive2(true);
    } else if (location.pathname === '/balance' && user) {
      setActive(true);
      setActive2(false);
    } else if (location.pathname === '/' && user) {
      setActive(false);
      setActive2(true);
    } else if (location.pathname === '/categories' && user) {
      setActive(false);
      setActive2(false);
    }
  }, [location, user]);

  const handleActive = useCallback(
    (act: boolean, act2: boolean, nav: To) => {
      setActive(act);
      setActive2(act2);
      navigate(nav);
    },
    [navigate],
  );

  return (
    <>
      <div className="navbar-container">
        <button
          className="navbar-button"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={solid('bars')} size="2x" />
        </button>
        {user ? (<button className="navbar-button" type="button">
          <FontAwesomeIcon icon={solid('basket-shopping')} size="2x" />
        </button>) : <div />}

      </div>
      <div className={open ? 'navbar-list' : 'navbar-list navbar-list-closed'}>
        <button
          type="button"
          className="navbar-close"
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={solid('xmark')} size="2x" />
        </button>
        <img className="navbar-logo" src={logo} alt="logo" />

        {user ? (
          <ul>
            <li className={active && active2 ? 'navbar-active' : ''}>
              <button
                onClick={() => handleActive(true, true, '/requests')}
                type="button"
              >
                <h4>Pedidos</h4>
              </button>
            </li>
            <li className={!active && active2 ? 'navbar-active' : ''}>
              <button
                onClick={() => handleActive(false, true, '/')}
                type="button"
              >
                <h4>Produtos</h4>
              </button>
            </li>

            <li className={!active && !active2 ? 'navbar-active' : ''}>
              <button
                onClick={() => handleActive(false, false, '/categories')}
                type="button"
              >
                <h4>Categorias</h4>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  context.logout();
                  navigate('/');
                }}
              >
                <FontAwesomeIcon
                  icon={solid('arrow-right-from-bracket')}
                  size="2x"
                />{' '}
                <pre> </pre>
                <h4>Sair</h4>
              </button>
            </li>
          </ul>
        ) : (
          <ul>
            <li className={active ? 'navbar-active' : ''}>
              <button
                type="button"
                onClick={() => (active ? {} : handleActive(true, false, '/'))}
              >
                Produtos
              </button>
            </li>
            <li className={!active ? 'navbar-active' : ''}>
              <button
                type="button"
                onClick={() => (active ? handleActive(false, false, '/tracking') : {})}
              >
                Rastreamento
              </button>
            </li>
          </ul>
        )}

      </div>
      <button
        className={
          open
            ? 'navbar-button-cover'
            : 'navbar-button-cover  navbar-cover-closed'
        }
        type="button"
        onClick={() => setOpen(!open)}
      >
        <div
          className={open ? 'navbar-cover' : 'navbar-cover navbar-cover-closed'}
        />
      </button>
    </>
  );
};

export default NavBar;
