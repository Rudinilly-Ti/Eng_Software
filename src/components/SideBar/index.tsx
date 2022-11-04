import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import React, {
  useState,
  useCallback,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react';
import { useNavigate, To, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './styles.scss';
import { logout } from '../../services/auth';

type Props = {
  user: boolean;
  resized: boolean;
  setResized: Dispatch<SetStateAction<boolean>>;
};

const SideBar = ({ user, resized, setResized }: Props) => {
  const [active, setActive] = useState<boolean>(true);
  const [active2, setActive2] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/tracking') {
      setActive(false);
    } else if (location.pathname === '/orders' && user) {
      setActive(true);
      setActive2(true);
    } else if (location.pathname === '/balance' && user) {
      setActive(true);
      setActive2(false);
    } else if (location.pathname === '/products' && user) {
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
              <button
                onClick={() => handleActive(true, true, '/orders')}
                type="button"
              >
                {!resized ? (
                  <h4>Pedidos</h4>
                ) : (
                  <FontAwesomeIcon icon={solid('truck')} size="lg" />
                )}
              </button>
            </li>
            <li className={active && !active2 ? 'sidebar-active' : ''}>
              <button
                onClick={() => handleActive(true, false, '/balance')}
                type="button"
              >
                {!resized ? (
                  <h4>Caixa</h4>
                ) : (
                  <FontAwesomeIcon icon={solid('cash-register')} size="lg" />
                )}
              </button>
            </li>

            <li className={!active && active2 ? 'sidebar-active' : ''}>
              <button
                onClick={() => handleActive(false, true, '/products')}
                type="button"
              >
                {!resized ? (
                  <h4>Produtos</h4>
                ) : (
                  <FontAwesomeIcon icon={solid('pizza-slice')} size="lg" />
                )}
              </button>
            </li>

            <li className={!active && !active2 ? 'sidebar-active' : ''}>
              <button
                onClick={() => handleActive(false, false, '/categories')}
                type="button"
              >
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
          <button
            type="button"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
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
              onClick={() =>
                active ? {} : handleActive(true, false, '/products')
              }
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
              onClick={() =>
                active ? handleActive(false, false, '/tracking') : {}
              }
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
