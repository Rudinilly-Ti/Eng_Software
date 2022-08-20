import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import React, { useState, useCallback } from 'react';
import logo from '../../assets/logo.png';
import './styles.scss';

type Props = {
  user: boolean;
};

const SideBar = ({ user }: Props) => {
  const [active, setActive] = useState<boolean>(true);
  const [active2, setActive2] = useState<boolean>(true);
  const [resized, setResized] = useState<boolean>(false);

  const handleActive = useCallback((act: boolean, act2: boolean) => {
    setActive(act);
    setActive2(act2);
  }, []);

  if (user) {
    return (
      <div
        className={
          resized ? 'sidebar-container sidebar-minimized' : 'sidebar-container'
        }
      >
        <div className="sidebar-content">
          <button
            onClick={() => setResized(!resized)}
            type="button"
            className={
              resized ? 'sidebar-arrow sidebar-arrow-rotated' : 'sidebar-arrow'
            }
          >
            <FontAwesomeIcon icon={solid('angle-left')} size="2x" />
          </button>
          <img className="sidebar-logo" src={logo} alt="logo" />

          <ul className="sidebar-list">
            <li className={active && active2 ? 'sidebar-active' : ''}>
              <button onClick={() => handleActive(true, true)} type="button">
                {!resized ? (
                  <h4>Pedidos</h4>
                ) : (
                  <FontAwesomeIcon icon={solid('truck')} size="lg" />
                )}
              </button>
            </li>
            <li className={active && !active2 ? 'sidebar-active' : ''}>
              <button onClick={() => handleActive(true, false)} type="button">
                {!resized ? (
                  <h4>Caixa</h4>
                ) : (
                  <FontAwesomeIcon icon={solid('cash-register')} size="lg" />
                )}
              </button>
            </li>

            <li className={!active && active2 ? 'sidebar-active' : ''}>
              <button onClick={() => handleActive(false, true)} type="button">
                {!resized ? (
                  <h4>Produtos</h4>
                ) : (
                  <FontAwesomeIcon icon={solid('pizza-slice')} size="lg" />
                )}
              </button>
            </li>

            <li className={!active && !active2 ? 'sidebar-active' : ''}>
              <button onClick={() => handleActive(false, false)} type="button">
                {!resized ? (
                  <h4>Categorias</h4>
                ) : (
                  <FontAwesomeIcon icon={solid('clipboard')} size="lg" />
                )}
              </button>
            </li>
          </ul>
        </div>
        <div className="sidebar-exit">
          <button type="button">
            <FontAwesomeIcon
              icon={solid('arrow-right-from-bracket')}
              size="2x"
            />{' '}
            <pre> </pre>
            {resized ? '' : <h4>Sair</h4>}
          </button>
        </div>
      </div>
    );
  }
  return (
    <div
      className={
        resized ? 'sidebar-container sidebar-minimized' : 'sidebar-container'
      }
    >
      <div className="sidebar-content">
        <button
          onClick={() => setResized(!resized)}
          type="button"
          className={
            resized ? 'sidebar-arrow sidebar-arrow-rotated' : 'sidebar-arrow'
          }
        >
          <FontAwesomeIcon icon={solid('angle-left')} size="2x" />
        </button>
        <img className="sidebar-logo" src={logo} alt="logo" />

        <ul className="sidebar-list">
          <li className={active ? 'sidebar-active' : ''}>
            <button
              onClick={() => (active ? {} : setActive(true))}
              type="button"
            >
              {!resized ? (
                <h4>Produtos</h4>
              ) : (
                <FontAwesomeIcon icon={solid('pizza-slice')} size="lg" />
              )}
            </button>
          </li>
          <li className={!active ? 'sidebar-active' : ''}>
            <button
              onClick={() => (active ? setActive(false) : {})}
              type="button"
            >
              {!resized ? (
                <h4>Rastreamento</h4>
              ) : (
                <FontAwesomeIcon icon={solid('truck')} size="lg" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
