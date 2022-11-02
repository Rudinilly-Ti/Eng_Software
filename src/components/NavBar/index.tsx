import React, { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { To, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './styles.scss';

const NavBar = () => {
  const [active, setActive] = useState(true);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/tracking') {
      setActive(false);
    }
  }, [location]);

  const handleActive = useCallback(
    (act: boolean, nav: To) => {
      setActive(act);
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
        <button className="navbar-button" type="button">
          <FontAwesomeIcon icon={solid('basket-shopping')} size="2x" />
        </button>
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

        <ul>
          <li className={active ? 'navbar-active' : ''}>
            <button
              type="button"
              onClick={() => (active ? {} : handleActive(!active, '/products'))}
            >
              Produtos
            </button>
          </li>
          <li className={!active ? 'navbar-active' : ''}>
            <button
              type="button"
              onClick={() => (active ? handleActive(!active, '/tracking') : {})}
            >
              Rastreamento
            </button>
          </li>
        </ul>
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
