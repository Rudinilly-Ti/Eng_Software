import React, { useState } from 'react';
import './addButton.scss';
import GenericModal from '../../GenericModal';
import FinallyButton from './FinallyButton';
import { Category } from '../../../types/category';
import api from '../../../services/api';
import SquareButton from '../../SquareButton';

type Props = {
  fetchCategories(): void;
  setMessage(msg: any): void;
};

const AddButton = ({ fetchCategories, setMessage }: Props) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [category, setCategory] = useState<Category>({});

  const closeModal = () => {
    setCategory({});
    setModalStatus(false);
  };

  const openModal = () => {
    setModalStatus(true);
  };

  async function submitForm() {
    await api
      .post('/product-types', category)
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
            primaryColor: '#68a373',
            secondaryColor: '#39593f',
            msg: 'Sucesso ao adicionar categoria',
            className: 'notice-card',
          });
        }
      })
      .catch(() => {
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
        <SquareButton char="+" click={openModal} />
      </div>

      <GenericModal
        onClose={closeModal}
        show={modalStatus}
        title="Adicionar uma Categoria"
      >
        <div className="categoryContainer">
          <input
            value={category.name ? category.name : ''}
            type="text"
            placeholder="Nome da Categoria"
            onChange={(e) => {
              setCategory({ name: e.currentTarget.value });
            }}
          />
          <div className="finally">
            <FinallyButton submit={submitForm} />
          </div>
        </div>
      </GenericModal>
    </>
  );
};

export default AddButton;
