import React, { useEffect, useRef, useState } from 'react';
import api from '../../services/api';
import './style.scss';

type Props = {
  changeAlertMessage(msg: any): void;
};

const OpenStore = ({ changeAlertMessage }: Props) => {
  const [active, setActive] = useState(false);
  const ball: any = useRef(null);
  const rect: any = useRef(null);

  async function fetchStoreStatus(setAlert: any) {
    await api
      .get('/store-status')
      .then((response) => {
        setActive(response.data.status);
        if (response.data.status) {
          ball.current.className = 'ball ball-animation';
          rect.current.className = 'rectangle-animation';
        } else {
          ball.current.className = 'ball';
        }
      })
      .catch(() => {
        setTimeout(() => {
          setAlert({
            primaryColor: '',
            secondaryColor: '',
            msg: '',
            className: '',
          });
        }, 5000);
        return setAlert({
          primaryColor: '#BF2604',
          secondaryColor: '#730202',
          msg: 'Erro ao verificar estado da loja',
          className: 'notice-card',
        });
      });
  }

  async function changeStoreState(state: boolean) {
    await api
      .put('/store-status', { status: state })
      .then(() => {
        setTimeout(() => {
          changeAlertMessage({
            primaryColor: '',
            secondaryColor: '',
            msg: '',
            className: '',
          });
        }, 5000);
        return changeAlertMessage({
          primaryColor: '#68a373',
          secondaryColor: '#39593f',
          msg: 'Estado configurado com sucesso',
          className: 'notice-card',
        });
      })
      .catch(() => {
        setTimeout(() => {
          changeAlertMessage({
            primaryColor: '',
            secondaryColor: '',
            msg: '',
            className: '',
          });
        }, 5000);
        return changeAlertMessage({
          primaryColor: '#BF2604',
          secondaryColor: '#730202',
          msg: 'Erro configurar novo estado',
          className: 'notice-card',
        });
      });
  }

  function handleOpenStore() {
    const newActive = !active;
    setActive(newActive);

    changeStoreState(newActive);

    if (newActive) {
      ball.current.className = 'ball ball-animation';
      rect.current.className = 'rectangle-animation';
    } else {
      ball.current.className = 'ball-r ball-animation-r';
      rect.current.className = 'rectangle-animation-r';
    }
  }

  useEffect(() => {
    fetchStoreStatus(changeAlertMessage);
  }, [changeAlertMessage]);

  return (
    <div className="buttonSetOn">
      <div className="open">
        <p className="paragraph"> Abrir loja </p>
        <div id="retangle" ref={rect}>
          <button
            ref={ball}
            onClick={handleOpenStore}
            aria-label="open store"
            type="button"
            className="ball"
          />
        </div>
      </div>
    </div>
  );
};

export default OpenStore;
