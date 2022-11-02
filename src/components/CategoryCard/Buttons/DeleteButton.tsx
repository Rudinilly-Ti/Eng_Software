import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './buttons.scss';
import GenericModal from '../../GenericModal';
import FinallyButton from './FinallyButton';
import { Category } from '../../../types/category';
import api from '../../../services/api';

type Props = {
  category: Category;
  fetchCategories(): void;
  setMessage(msg: any): void;
};

const DeleteButton = ({ category, fetchCategories, setMessage }: Props) => {
  const [modalStatus, setModalStatus] = useState(false);

  const closeModal = () => {
    setModalStatus(false);
  };

  const openModal = () => {
    setModalStatus(true);
  };

  async function remove() {
    await api
      .delete(`/product-types/${category.id}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          closeModal();
          fetchCategories();
          setTimeout(() => {
            setMessage({
              primaryColor: '',
              secondaryColor: '',
              msg: '',
              className: '',
            });
          }, 5000);
          setMessage({
            primaryColor: '#BF2604',
            secondaryColor: '#730202',
            msg: 'Sucesso ao deletar categoria',
            className: 'notice-card',
          });
        }
      })
      .catch(() => {
        closeModal();
        setTimeout(() => {
          setMessage({
            primaryColor: '',
            secondaryColor: '',
            msg: '',
            className: '',
          });
        }, 5000);
        return setMessage({
          primaryColor: '#BF2604',
          secondaryColor: '#730202',
          msg: 'Erro ao deletar categoria',
          className: 'notice-card',
        });
      });
  }

  return (
    <>
      <div className="container">
        <button type="button" className="buttonss">
          <FontAwesomeIcon
            icon={solid('trash')}
            size="sm"
            onClick={openModal}
            type="button"
          />
        </button>
      </div>

      <GenericModal
        onClose={closeModal}
        show={modalStatus}
        title="Excluir Categoria"
      >
        <div className="categoryContainer">
          Deseja excluir essa categoria?
          <div className="finally">
            <FinallyButton remove={remove} />
          </div>
        </div>
      </GenericModal>
    </>
  );
};

export default DeleteButton;
