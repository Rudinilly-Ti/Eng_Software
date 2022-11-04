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
};

const EditButton = ({ category, fetchCategories }: Props) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [newCategory, setNewCategory] = useState<Category>(category);

  const closeModal = () => {
    setNewCategory({});
    setModalStatus(false);
  };

  const openModal = () => {
    setModalStatus(true);
  };

  async function edit() {
    await api
      .patch(`/product-types/${category.id}`, newCategory)
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
        <button type="button" className="buttonss">
          <FontAwesomeIcon
            icon={solid('pen')}
            size="lg"
            onClick={openModal}
            type="button"
          />
        </button>
      </div>

      <GenericModal
        onClose={closeModal}
        show={modalStatus}
        title="Editar Categoria"
      >
        <div className="categoryContainer">
          Nova Categoria:
          <input
            type="text"
            value={newCategory.name ? newCategory.name : ''}
            placeholder="Nome da Categoria"
            onChange={(e) => {
              setNewCategory({ name: e.currentTarget.value });
            }}
          />
          <div className="finally">
            <FinallyButton edit={edit} />
          </div>
        </div>
      </GenericModal>
    </>
  );
};

export default EditButton;
