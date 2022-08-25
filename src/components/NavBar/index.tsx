import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import logo from '../../assets/logo.png';
import './styles.scss';

const NavBar = () => {
  const [active, setActive] = useState(true);
  const [open, setOpen] = useState(false);

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
              onClick={() => (active ? {} : setActive(!active))}
            >
              Produtos
            </button>
          </li>
          <li className={!active ? 'navbar-active' : ''}>
            <button
              type="button"
              onClick={() => (active ? setActive(!active) : {})}
            >
              Rastreamento
            </button>
          </li>
        </ul>
      </div>
      <div
        className={open ? 'navbar-cover' : 'navbar-cover navbar-cover-closed'}
      />
    </>
  );
};

export default NavBar;
