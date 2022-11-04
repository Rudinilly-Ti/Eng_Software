import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './addButton.scss';
import GenericModal from '../../GenericModal';
import FinallyButton from './FinallyButton';
import { Category } from '../../../types/category';
import api from '../../../services/api';
import SquareButton from '../../SquareButton';

type Props = {
  fetchCategories(): void;
};

const AddButton = ({ fetchCategories }: Props) => {
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
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  return (
    <>
      <div className="container">
       <SquareButton char={'+'} click={openModal}></SquareButton>
      </div>

      <GenericModal
        onClose={closeModal}
        show={modalStatus}
        title="Adicionar uma Categoria"
      >
        <div className="categoryContainer">
          Adicionar Categoria:
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
