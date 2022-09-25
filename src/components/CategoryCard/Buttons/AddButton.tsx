import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './addButton.scss';
import GenericModal from '../../GenericModal';
import FinallyButton from './FinallyButton';

const AddButton = () => {
  const [modalStatus, setModalStatus] = useState(false);

  const closeModal = () => {
    setModalStatus(false);
  };

  const openModal = () => {
    setModalStatus(true);
  };

  return (
    <>
      <div className="container">
        <button type="button" className="add">
          <FontAwesomeIcon
            icon={solid('plus')}
            size="sm"
            onClick={openModal}
            type="button"
          />
        </button>
      </div>

      <GenericModal
        onClose={closeModal}
        show={modalStatus}
        title="Adicionar uma Categoria"
      >
        <div className="categoryContainer">
          Adicionar Categoria:
          <input type="text" />
          <div className="finally">
            <FinallyButton />
          </div>
        </div>
      </GenericModal>
    </>
  );
};

export default AddButton;
